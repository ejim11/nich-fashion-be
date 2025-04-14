import { Injectable, Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

// inorder to inject a request to a provider
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

/**
 * provider for pagination
 */
@Injectable()
export class PaginationProvider {
  /**
   * constructor
   * @param request
   */
  constructor(
    /**
     * Injecting request
     */
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  /**
   * function for paginating find all queries
   * @param paginationQuery
   * @param repository
   * @param options
   * @returns data, metadata and links for the findAll queries
   */
  public async paginationQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    queryBuilder: SelectQueryBuilder<T>,
  ): Promise<Paginated<T>> {
    const { limit, page } = paginationQuery;

    // Apply pagination to the query
    const paginatedQuery = queryBuilder.skip((page - 1) * limit).take(limit);

    // Execute the query to get results
    const results = await paginatedQuery.getMany();

    // Get total items (clone the query to avoid modifying the original)
    const totalItems = await queryBuilder.getCount();

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page >= totalPages ? page : page + 1;
    const prevPage = page <= 1 ? page : page - 1;

    // Create the request URLs
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems: totalItems,
        currentPage: page,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${prevPage}`,
      },
    };

    return finalResponse;
  }
}
