import { SortType } from './sort-type.enum';

export interface Pageable {
  page?: number;
  count?: number;
  sort?: SortType;
}
