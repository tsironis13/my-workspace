export type ColumnType<T> = {
  field: keyof T;
  header: string;
};
