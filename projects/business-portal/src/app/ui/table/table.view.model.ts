export type PaginationViewModel = {
  pageSizeOptions: number[];
  defaultPageSize: number;
};

export type ColumnTypeViewModel<T> = {
  field: keyof T;
  header: string;
  metaData?: ColumnMetaDataViewModel;
};

type ColumnMetaDataViewModel = {
  disableSort: boolean;
};

export type SortDataViewModel<T> = {
  sortBy: keyof T;
  sortOrder: 1 | -1;
};

export type TableMetadataViewModel = {
  resetPagination: boolean;
};
