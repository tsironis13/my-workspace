export type EntityFilterPostDto<T> = {
  [Property in keyof T]+?: T[Property];
};
