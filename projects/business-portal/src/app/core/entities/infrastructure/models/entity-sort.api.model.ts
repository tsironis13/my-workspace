export type EntitySortApiModel<T> = {
  sortBy: keyof T;
  sortOrder: 1 | -1;
};
