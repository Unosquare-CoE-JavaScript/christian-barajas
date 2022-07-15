export interface Pagination<T> {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pageQuantity: number;
  data: T[];
  FilterItem: {},
  totalRows: number;
}


