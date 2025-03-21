export type EntityFilterApiModel<T> = {
  [Property in keyof T]+?: T[Property];
};
