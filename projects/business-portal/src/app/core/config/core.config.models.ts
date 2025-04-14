export type PaginatorConfig = {
  defaultPageNumber: number;
  defaultPageSize: number;
  pageSizeOptions: number[];
};

export type SortConfig<T> = {
  sortBy: keyof T;
  sortOrder: 1 | -1;
};

export type YesNoConfig = {
  value: boolean;
  name: string;
};
