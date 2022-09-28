import { DynamicModule, Global, Module } from '@nestjs/common';
import { defaultValues, PAGINATION_OPTIONS } from './constants';
import { PaginationModuleOptions } from './interface';

import { PaginationService } from './pagination.service';

// @Global()
@Module({
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {
  static forRoot(
    options: PaginationModuleOptions = {
      limit: defaultValues.limit,
      page: defaultValues.page,
      isGlobal: defaultValues.global,
      orderDirection: defaultValues.orderDirection,
    },
  ): DynamicModule {
    return {
      module: PaginationModule,
      providers: [
        {
          provide: PAGINATION_OPTIONS,
          useValue: options,
        },
        PaginationService,
      ],
      global: options?.isGlobal,
      exports: [PaginationService],
    };
  }
}
