export type SelectItemViewModel<T = unknown> = {
  label: string;
  value: T;
};

export type SelectItemCustomTemplateViewModel<T> = SelectItemViewModel & {
  [K in keyof T]?: T[K];
};
