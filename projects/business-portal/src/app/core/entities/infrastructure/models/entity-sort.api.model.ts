export type EntitySortPostDto<T> = {
  sortBy: keyof T;
  sortOrder: 1 | -1;
};
