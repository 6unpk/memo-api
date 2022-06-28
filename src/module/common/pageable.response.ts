export class PageableResponse<T> {
  count: number;
  page: number;
  limit: number;
  items: T[];

  constructor(items: T[], count: number, page: number, limit: number) {
    this.items = items;
    this.count = count;
    this.limit = limit;
    this.page = page;
  }
}
