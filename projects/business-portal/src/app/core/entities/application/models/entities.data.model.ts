export type Entities<T> = {
  items: T[];
  totalCount: number;
};

export type EntitiesMapped<Source, Target extends Source> = {
  [K in keyof Source]: Target[K];
};
