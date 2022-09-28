import { DynamicModule, Module } from '@nestjs/common';
import { defaultValues, PAGINATION_OPTIONS } from './constants';
import { PaginationModuleOptions } from './interface';
import { PaginationService } from './pagination.service';

@Module({
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {
  static forRoot(options: PaginationModuleOptions = {}): DynamicModule {
    return {
      module: PaginationModule,
      providers: [
        PaginationService,
        {
          provide: PAGINATION_OPTIONS,
          useValue: defaultValues,
        },
      ],
      global: options?.isGlobal,
      exports: [PaginationService],
    };
  }
}
