export type SelectItemViewModel = {
  label: string;
  value: string | number;
};

export type SelectItemCustomTemplateViewModel<T> = SelectItemViewModel & {
  [K in keyof T]?: T[K];
};
