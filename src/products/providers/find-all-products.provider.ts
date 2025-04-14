import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetProductsDto } from '../dtos/get-product.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { Product } from '../product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Like, Repository } from 'typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class FindAllProductsProvider {
  constructor(
    /**
     * injecting the product repository
     */
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    /**
     * injecting the pagination provider
     */
    private readonly paginationProvider: PaginationProvider,

    /**
     * Injecting request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * @function finds all products And handle queries for filtering products
   * @param productQuery
   * @returns  a paginated list of products
   */
  public async findAll(
    productQuery: GetProductsDto,
  ): Promise<Paginated<Product>> {
    const cleanedQuery = this.cleanQuery(productQuery);
    const { limit, page, sort } = cleanedQuery;

    const whereOptions = [];

    Object.keys(cleanedQuery).forEach((key) => {
      if (
        key === 'limit' ||
        key === 'page' ||
        key === 'sort' ||
        !cleanedQuery[key]
      ) {
        return;
      }

      const conditions = {
        category: cleanedQuery['category']
          ? In(cleanedQuery['category'].split(','))
          : null,
        price: cleanedQuery['price']
          ? Between(
              parseFloat(cleanedQuery['price'].split('-')[0]),
              parseFloat(cleanedQuery['price'].split('-')[1]),
            )
          : null,
        clothType: cleanedQuery['clothType']
          ? In(cleanedQuery['clothType'].split(','))
          : null,
        dressStyle: cleanedQuery['dressStyle']
          ? In(cleanedQuery['dressStyle'].split(','))
          : null,
        name: cleanedQuery['name']
          ? Like(`%${cleanedQuery['name'].split('-').join(' ')}%`)
          : null,
        variants: {
          color: cleanedQuery['colors']
            ? In(cleanedQuery['colors'].split(','))
            : null,
          size: cleanedQuery['sizes']
            ? In(cleanedQuery['sizes'].split(','))
            : null,
        },
      };

      if (
        conditions.variants.color === null &&
        conditions.variants.size === null
      ) {
        conditions.variants = null;
      }

      const filteredConditions = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(conditions).filter(([_, v]) => v !== null),
      );

      whereOptions.push(filteredConditions);
    });

    const checkWhereOptions = whereOptions.length;

    // Special handling for most_purchased sorting
    if (sort === 'most_purchased') {
      try {
        // First, get the product IDs ordered by purchase count
        let rawQuery = `
              WITH purchase_counts AS (
                SELECT 
                  "variantId" as variant_id, 
                  SUM(quantity) as purchase_quantity 
                FROM 
                  payment_variants 
                GROUP BY 
                  "variantId"
              ),
              product_purchase_counts AS (
                SELECT 
                  p.id as product_id, 
                  MAX(pc.purchase_quantity) as max_purchase_quantity
                FROM 
                  product p
                INNER JOIN 
                  product_variant v ON v."productId" = p.id
                LEFT JOIN 
                  purchase_counts pc ON pc.variant_id = v.id
            `;

        // Add the WHERE clause if necessary
        const queryParams = [];

        if (checkWhereOptions) {
          // Extract categories for the WHERE clause
          const categoryCondition = whereOptions.find(
            (option) => option.category,
          );
          if (categoryCondition && categoryCondition.category) {
            rawQuery += ` WHERE p.category = ANY($1)`;
            queryParams.push(categoryCondition.category.value);
          }
        }

        // Complete the query with the ordering and limits
        rawQuery += `
                GROUP BY 
                  p.id
                ORDER BY 
                  max_purchase_quantity DESC NULLS LAST
                LIMIT $${queryParams.length + 1}
                OFFSET $${queryParams.length + 2}
              )
              SELECT product_id FROM product_purchase_counts
            `;

        // Add limit and offset parameters
        queryParams.push(limit);
        queryParams.push((page - 1) * limit);

        // Execute the raw query to get sorted product IDs
        const result = await this.productRepository.query(
          rawQuery,
          queryParams,
        );

        // Get total count for pagination
        let countQuery = `
              WITH purchase_counts AS (
                SELECT 
                  "variantId" as variant_id, 
                  SUM(quantity) as purchase_quantity 
                FROM 
                  payment_variants 
                GROUP BY 
                  "variantId"
              ),
              product_purchase_counts AS (
                SELECT 
                  p.id as product_id
                FROM 
                  product p
                INNER JOIN 
                  product_variant v ON v."productId" = p.id
                LEFT JOIN 
                  purchase_counts pc ON pc.variant_id = v.id
            `;

        // Use the same WHERE clause and parameters for the count query
        const countParams = [];

        if (checkWhereOptions) {
          // Extract categories for the WHERE clause
          const categoryCondition = whereOptions.find(
            (option) => option.category,
          );
          if (categoryCondition && categoryCondition.category) {
            countQuery += ` WHERE p.category = ANY($1)`;
            countParams.push(categoryCondition.category.value);
          }
        }

        countQuery += `
                GROUP BY 
                  p.id
              )
              SELECT COUNT(*) as total FROM product_purchase_counts
            `;

        const countResult = await this.productRepository.query(
          countQuery,
          countParams,
        );
        const totalCount = parseInt(countResult[0].total);

        if (!result || result.length === 0) {
          return this.createPaginatedResponse([], {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: Number(limit),
            totalPages: 0,
            currentPage: Number(page),
          });
        }

        // Extract product IDs
        const productIds = result.map((row) => row.product_id);

        // Get the full products with their relations
        const queryBuilder = this.productRepository
          .createQueryBuilder('product')
          .leftJoinAndSelect('product.variants', 'variants')
          .leftJoinAndSelect('product.reviews', 'reviews')
          .leftJoinAndSelect('variants.images', 'images')
          .where('product.id IN (:...productIds)', { productIds });

        // Execute the query to get the products
        const products = await queryBuilder.getMany();

        // Sort the products to match the order from our raw query
        const sortedProducts = productIds
          .map((id) => products.find((product) => product.id === id))
          .filter(Boolean);

        // Return paginated result with links
        return this.createPaginatedResponse(sortedProducts, {
          totalItems: totalCount,
          itemCount: sortedProducts.length,
          itemsPerPage: Number(limit),
          totalPages: Math.ceil(totalCount / Number(limit)),
          currentPage: Number(page),
        });
      } catch (error) {
        console.error('Error in most_purchased sorting:', error);
        throw new NotFoundException(
          error.message || 'Failed to fetch products',
        );
      }
    }

    // Standard handling for other sorting options
    let queryBuilder = this.productRepository.createQueryBuilder('product');

    if (checkWhereOptions) {
      whereOptions.forEach((condition) => {
        queryBuilder = queryBuilder.andWhere(condition);
      });
    }

    queryBuilder = queryBuilder.leftJoinAndSelect(
      'product.variants',
      'variants',
    );

    queryBuilder = queryBuilder.leftJoinAndSelect('product.reviews', 'reviews');

    queryBuilder = queryBuilder.leftJoinAndSelect('variants.images', 'images');

    if (sort === 'newest') {
      queryBuilder = queryBuilder.orderBy('product.createdAt', 'DESC');
    } else if (sort === 'oldest') {
      queryBuilder = queryBuilder.orderBy('product.createdAt', 'ASC');
    }

    try {
      const products = await this.paginationProvider.paginationQuery(
        { limit, page },
        queryBuilder,
      );

      return products;
    } catch (error) {
      throw new NotFoundException(error.message || 'Failed to fetch products');
    }
  }

  /**
   * Helper method to clean query by removing undefined parameters
   * @param query
   * @returns GetProductsDto
   */
  private cleanQuery(query: GetProductsDto): GetProductsDto {
    return Object.fromEntries(
      Object.entries(query).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) =>
          value !== 'undefined' && value !== undefined && value !== '',
      ),
    ) as GetProductsDto;
  }

  /**
   * Helper method to create a paginated response with links
   * @param data The items to include in the response
   * @param meta The pagination metadata
   * @returns Paginated<T> object with data, meta, and links
   */
  private createPaginatedResponse(
    data: Product[],
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    },
  ): Paginated<Product> {
    const { totalPages, currentPage, itemsPerPage } = meta;
    const nextPage = currentPage >= totalPages ? currentPage : currentPage + 1;
    const prevPage = currentPage <= 1 ? currentPage : currentPage - 1;

    // Create the request URLs
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);

    // Preserve all existing query parameters except page and limit
    const queryParams = new URLSearchParams(newUrl.search);

    return {
      data,
      meta,
      links: {
        first: this.buildUrl(newUrl, {
          ...Object.fromEntries(queryParams),
          page: 1,
          limit: itemsPerPage,
        }),
        last: this.buildUrl(newUrl, {
          ...Object.fromEntries(queryParams),
          page: totalPages,
          limit: itemsPerPage,
        }),
        current: this.buildUrl(newUrl, {
          ...Object.fromEntries(queryParams),
          page: currentPage,
          limit: itemsPerPage,
        }),
        next: this.buildUrl(newUrl, {
          ...Object.fromEntries(queryParams),
          page: nextPage,
          limit: itemsPerPage,
        }),
        previous: this.buildUrl(newUrl, {
          ...Object.fromEntries(queryParams),
          page: prevPage,
          limit: itemsPerPage,
        }),
      },
    };
  }

  /**
   * Helper method to build a URL with query parameters
   * @param baseUrl The base URL object
   * @param params The query parameters to add
   * @returns A string URL with query parameters
   */
  private buildUrl(baseUrl: URL, params: Record<string, any>): string {
    const url = new URL(baseUrl.pathname, baseUrl.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value.toString());
      }
    });
    return url.toString();
  }
}
