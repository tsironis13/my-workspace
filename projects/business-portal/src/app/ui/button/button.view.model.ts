export type BaseButtonConfigViewModel = {
  variant?: 'outlined' | 'text';
  rounded?: boolean;
};

export type IconButtonConfigViewModel = BaseButtonConfigViewModel & {
  type: 'icon';
  icon: string;
  label?: string;
  ariaLabel?: string;
};

export type RegularButtonConfigViewModel = BaseButtonConfigViewModel & {
  type: 'basic';
  label: string;
};

export type ButtonConfigViewModel =
  | IconButtonConfigViewModel
  | RegularButtonConfigViewModel;
