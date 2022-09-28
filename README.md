<h1 align="center"></h1>

<h3 align="center">NestJS Sequelize Pagination</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

## Installation

```
$ npm install @ntheanh201/nestjs-sequelize-pagination
```

```
$ yarn add @ntheanh201/nestjs-sequelize-pagination
```

## Getting Started

### Import
Import and add StripeModule to the imports section of the consuming module (most likely AppModule).

```
import { PaginationModule } from '@ntheanh201/nestjs-sequelize-pagination';

@Module({
  imports: [
    PaginationModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
```

### Configuration

This module support forRoot patterns for configuration, with values:

| Name           | Description                                       | Type                      | Default    |
| -------------- | ------------------------------------------------- | ------------------------- | ---------- |
| isGlobal       | Use module globally                               | _boolean_                 | `true`     |
| limit          | The number of rows returned                       | _number_                  | `10`       |
| page           | The page to start pagination, one-based indexing  | _number_                  | `1`        |
| orderBy        | The key sorting returned data                     | _string_                  | `null`     |
| orderDirection | The sorting direction (ASC, DESC, NULLS FIRST)    | _string_                  | `null`     |

### Service

```
import { Injectable } from '@nestjs/common';
import { Includeable, Op } from 'sequelize';
import {
  PaginationQuery,
  PaginationResponse,
  PaginationService,
} from '@ntheanh201/nestjs-sequelize-pagination';


@Injectable()
export class ProductService {
  constructor(
    private paginationService: PaginationService,
  ) {}

  findAll(
    paginationOptions: PaginationQuery,
    include: Includeable | Includeable[] = [],
  ): Promise<PaginationResponse<Product>> {
    let whereCondition;
    const keySearch = paginationOptions?.searchKey;
    if (keySearch) {
      whereCondition = {
        [Op.or]: [
          { sku: { [Op.like]: `%${keySearch}%` } },
          { barcode: { [Op.like]: `%${keySearch}%` } },
          { name: { [Op.like]: `%${keySearch}%` } },
        ],
      };
    }

    return this.paginationService.findAll(
      {
        ...paginationOptions,
        model: Product,
      },
      {
        where: whereCondition,
        include,
      },
    );
  }
}
```

### Controller

```
@Controller('/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get products' })
  getProducts(
    @Pagination({
      limit: 10,
      page: 0,
      orderBy: 'createdAt',
      orderDirection: 'DESC',
      searchKey: 'pro',
    })
    pagination: PaginationQuery,
  ): Promise<PaginationResponse<Product>> {
    return this.productService.findAll(pagination);
  }
}
```

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Stay in touch

**The Anh Nguyen ([Facebook](https://facebook.com/ntheanh201))**

## Reference

[dw-nest-sequelize-pagination](https://www.npmjs.com/package/dw-nest-sequelize-pagination)
