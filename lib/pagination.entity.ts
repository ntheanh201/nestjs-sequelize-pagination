import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Model, ModelStatic } from 'sequelize-typescript';

export class PaginationQuery {
  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsString()
  orderDirection?: string; // Sequelize valid directions: ASC, DESC, NULLS FIRST, ...

  @IsOptional()
  @IsString()
  searchKey?: string;
}

export interface PaginationOption extends PaginationQuery {
  model: ModelStatic<Model<any, any>>;
}

export interface PaginationResponse<T> extends PaginationQuery {
  data: T[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}
