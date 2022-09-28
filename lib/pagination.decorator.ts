import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { PaginationQuery } from './pagination.entity';

export const Pagination = createParamDecorator(
  (
    data: PaginationQuery | undefined,
    ctx: ExecutionContext,
  ): PaginationQuery => {
    const request = ctx.switchToHttp().getRequest();

    return {
      limit: request.query.limit
        ? parseInt(request.query.limit)
        : data?.limit || undefined,
      page: request.query.page ? parseInt(request.query.page) : data?.page || 0,
      orderBy: {
        key: request.query.sortBy || data?.orderBy?.key,
        direction: request.query.sortDirection || data?.orderBy?.key,
      },
      searchKey: request.query.searchKey || null,
    };
  },
  [
    (target: any, key: string | symbol) => {
      const Swagger = loadPackage(
        '@nestjs/swagger',
        'PaginationDecorator',
        () => require('@nestjs/swagger'),
      );

      if (Swagger) {
        Swagger.ApiQuery({
          name: 'page',
          schema: {
            type: 'number',
            description: 'The page to start pagination, zero-based indexing',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'limit',
          schema: {
            type: 'number',
            description: 'The limit, numbers of rows returnded',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'sortBy',
          schema: {
            type: 'string',
            description: 'The OrderBy key',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'sortDirection',
          schema: {
            type: 'string',
            description: 'The OrderBy direction',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
        Swagger.ApiQuery({
          name: 'searchKey',
          schema: {
            type: 'string',
            description: 'The search key',
          },
          required: false,
        })(target, key, Object.getOwnPropertyDescriptor(target, key));
      }
    },
  ],
);
