export type EntitySort<Z> = {
  sortBy: keyof Z;
  sortOrder: 1 | -1;
};
