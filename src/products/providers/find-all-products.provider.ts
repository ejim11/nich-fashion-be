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
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly paginationProvider: PaginationProvider,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async findAll(
    productQuery: GetProductsDto,
  ): Promise<Paginated<Product>> {
    const cleanedQuery = this.cleanQuery(productQuery);

    const { limit, page, sort } = cleanedQuery;

    // Ensure limit and page are valid numbers
    const safeLimit = Number(limit) > 0 ? Number(limit) : 10;
    const safePage = Number(page) > 0 ? Number(page) : 1;

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
      };

      const filteredConditions = Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(conditions).filter(([_, v]) => v !== null),
      );

      whereOptions.push(filteredConditions);
    });

    const checkWhereOptions = whereOptions.length;

    if (sort === 'most_purchased' || sort === 'last_updated_variant') {
      try {
        // Extract category condition
        const categoryCondition = whereOptions.find(
          (option) => option.category,
        );

        console.log('categoryCondition: ', categoryCondition);

        const categoryValues = this.extractCategoryValues(categoryCondition);

        console.log('categoryValues: ', categoryValues);

        // Build queries using the new method
        const queryResult = this.buildQueriesWithCategoryFilter(
          sort,
          categoryValues,
          safeLimit,
          safePage,
        );

        console.log('rawQuery:', queryResult.rawQuery, queryResult.parameters);
        console.log(
          'countQuery:',
          queryResult.countQuery,
          queryResult.countParameters,
        );

        const result = await this.productRepository.query(
          queryResult.rawQuery,
          queryResult.parameters,
        );
        console.log('result: ', result);

        const countResult = await this.productRepository.query(
          queryResult.countQuery,
          queryResult.countParameters,
        );
        console.log('countResult: ', countResult);

        const totalCount = parseInt(countResult[0].total);

        if (!result || result.length === 0) {
          console.log('No results returned from query:', result);
          return this.createPaginatedResponse([], {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: safeLimit,
            totalPages: 0,
            currentPage: safePage,
          });
        }

        const productIds = result.map((row) => row.product_id);
        const queryBuilder = this.productRepository
          .createQueryBuilder('product')
          .leftJoinAndSelect('product.variants', 'variants')
          .leftJoinAndSelect('product.reviews', 'reviews')
          .leftJoinAndSelect('variants.images', 'images')
          .where('product.id IN (:...productIds)', { productIds });

        const products = await queryBuilder.getMany();
        const sortedProducts = productIds
          .map((id) => products.find((product) => product.id === id))
          .filter(Boolean);

        return this.createPaginatedResponse(sortedProducts, {
          totalItems: totalCount,
          itemCount: sortedProducts.length,
          itemsPerPage: safeLimit,
          totalPages: Math.ceil(totalCount / safeLimit),
          currentPage: safePage,
        });
      } catch (error) {
        console.error(`Error in ${sort} sorting:`, error);
        throw new NotFoundException(
          error.message || 'Failed to fetch products',
        );
      }
    }

    let queryBuilder = this.productRepository.createQueryBuilder('product');

    if (checkWhereOptions) {
      whereOptions.forEach((condition) => {
        if (cleanedQuery['colors'] || cleanedQuery['sizes']) {
          if (Object.keys(condition).length > 0) {
            queryBuilder = queryBuilder.andWhere(condition);
          }
          if (cleanedQuery['colors']) {
            queryBuilder = queryBuilder.andWhere(
              'variants.color IN (:...colors)',
              {
                colors: cleanedQuery['colors'].split(','),
              },
            );
          }
          if (cleanedQuery['sizes']) {
            queryBuilder = queryBuilder.andWhere(
              'variants.size IN (:...sizes)',
              {
                sizes: cleanedQuery['sizes'].toUpperCase().split(','),
              },
            );
          }
        } else {
          queryBuilder = queryBuilder.andWhere(condition);
        }
      });
    }

    queryBuilder = queryBuilder
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.reviews', 'reviews')
      .leftJoinAndSelect('variants.images', 'images');

    if (sort === 'newest') {
      queryBuilder = queryBuilder.orderBy('product.createdAt', 'DESC');
    } else if (sort === 'oldest') {
      queryBuilder = queryBuilder.orderBy('product.createdAt', 'ASC');
    }

    try {
      const products = await this.paginationProvider.paginationQuery(
        { limit: safeLimit, page: safePage },
        queryBuilder,
      );
      return products;
    } catch (error) {
      console.error('Error in standard sorting:', error);
      throw new NotFoundException(error.message || 'Failed to fetch products');
    }
  }

  // NEW METHOD: Extract category values from FindOperator
  private extractCategoryValues(categoryCondition: any): string[] | null {
    if (!categoryCondition || !categoryCondition.category) {
      return null;
    }

    const findOperator = categoryCondition.category;

    // Handle TypeORM FindOperator (In operator)
    if (findOperator.value) {
      return Array.isArray(findOperator.value)
        ? findOperator.value
        : [findOperator.value];
    }

    // Handle TypeORM FindOperator with _value property
    if (findOperator._value) {
      return Array.isArray(findOperator._value)
        ? findOperator._value
        : [findOperator._value];
    }

    // Handle direct array
    if (Array.isArray(findOperator)) {
      return findOperator;
    }

    // Handle single value
    return [findOperator];
  }

  // NEW METHOD: Build queries with proper category filter
  private buildQueriesWithCategoryFilter(
    sort: string,
    categoryValues: string[] | null,
    limit: number,
    page: number,
  ) {
    const hasCategory = categoryValues !== null;
    const offset = (page - 1) * limit;

    let rawQuery = '';
    let countQuery = '';

    if (sort === 'most_purchased') {
      rawQuery = `
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
          ${hasCategory ? 'WHERE p.category = ANY($1)' : ''}
          GROUP BY 
            p.id
        )
        SELECT product_id, max_purchase_quantity
        FROM product_purchase_counts
        ORDER BY max_purchase_quantity DESC NULLS LAST
        LIMIT $${hasCategory ? '2' : '1'}
        OFFSET $${hasCategory ? '3' : '2'}
      `;

      countQuery = `
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
          ${hasCategory ? 'WHERE p.category = ANY($1)' : ''}
          GROUP BY 
            p.id
        )
        SELECT COUNT(*) as total FROM product_purchase_counts
      `;
    } else if (sort === 'last_updated_variant') {
      rawQuery = `
        WITH product_variant_counts AS (
          SELECT 
            p.id as product_id, 
            MAX(v."updatedAt") as max_updated_at
          FROM 
            product p
          INNER JOIN 
            product_variant v ON v."productId" = p.id
          ${hasCategory ? 'WHERE p.category = ANY($1)' : ''}
          GROUP BY 
            p.id
        )
        SELECT product_id, max_updated_at
        FROM product_variant_counts
        ORDER BY max_updated_at DESC
        LIMIT $${hasCategory ? '2' : '1'}
        OFFSET $${hasCategory ? '3' : '2'}
      `;

      countQuery = `
        WITH product_variant_counts AS (
          SELECT 
            p.id as product_id
          FROM 
            product p
          INNER JOIN 
            product_variant v ON v."productId" = p.id
          ${hasCategory ? 'WHERE p.category = ANY($1)' : ''}
          GROUP BY 
            p.id
        )
        SELECT COUNT(*) as total FROM product_variant_counts
      `;
    }

    const parameters = hasCategory
      ? [categoryValues, limit, offset]
      : [limit, offset];

    const countParameters = hasCategory ? [categoryValues] : [];

    return {
      rawQuery,
      countQuery,
      parameters,
      countParameters,
    };
  }

  private cleanQuery(query: GetProductsDto): GetProductsDto {
    return Object.fromEntries(
      Object.entries(query).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, value]) =>
          value !== 'undefined' && value !== undefined && value !== '',
      ),
    ) as GetProductsDto;
  }

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

    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);
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
