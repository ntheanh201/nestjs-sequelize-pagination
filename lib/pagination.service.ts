import { Injectable, Inject } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { getModelToken } from '@nestjs/sequelize';
import { FindAndCountOptions, Model, ModelStatic } from 'sequelize';
import { PAGINATION_OPTIONS } from './constants';
import {
  PaginationOption,
  PaginationQuery,
  PaginationResponse,
} from './pagination.entity';

@Injectable()
export class PaginationService {
  constructor(
    private moduleRef: ModuleRef,
    @Inject(PAGINATION_OPTIONS)
    private defaultOptions: PaginationQuery,
  ) {}

  async findAll<T>(
    options: PaginationOption,
    optionsSequelize: FindAndCountOptions,
  ): Promise<PaginationResponse<T>> {
    const repository: ModelStatic<Model<any, any>> = this.moduleRef.get(
      getModelToken(options.model),
      {
        strict: false,
      },
    );

    const limit = options.limit || this.defaultOptions.limit;

    let page = options.page || this.defaultOptions.page;
    page = page ? page - 1 : 0;

    const orderBy = options.orderBy || undefined;

    const orderDirection =
      options.orderDirection || this.defaultOptions.orderDirection || undefined;

    const offset = page * options.limit || page * options.limit;

    const queryOptions: FindAndCountOptions = {
      limit,
      offset,
      order: orderBy ? [[orderBy, orderDirection]] : undefined,
      ...optionsSequelize,
    };

    const response = await repository.findAndCountAll({
      ...queryOptions,
    });

    return {
      data: response.rows as T[],
      total: response.count,
      totalPages: Math.ceil(response.count / options.limit),
      limit: options.limit,
      page: options.page ? options.page : 1,
    };
  }
}
