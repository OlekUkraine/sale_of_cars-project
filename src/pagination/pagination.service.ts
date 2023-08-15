import { Injectable } from '@nestjs/common';
import { PaginatedDto } from '../common/pagination/response';

@Injectable()
export class PaginationService {
  public async paginate<T>(
    results: T[],
    options: {
      page: string;
      limit: string;
    },
  ): Promise<PaginatedDto<T>> {
    const offset = (+options.page - 1) * +options.limit;
    const paginatedData = results.slice(offset, offset + +options.limit);

    return {
      page: +options.page,
      pages: Math.ceil(results.length / +options.limit),
      countItem: results.length,
      entities: paginatedData,
    };
  }
}
