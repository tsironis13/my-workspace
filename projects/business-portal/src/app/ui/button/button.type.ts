export type BaseButtonConfig = {
  variant: 'outlined' | 'text' | undefined;
  rounded?: boolean;
};

export type IconButtonConfig = BaseButtonConfig & {
  type: 'icon';
  icon: string;
  label?: string;
  ariaLabel?: string;
};

export type RegularButtonConfig = BaseButtonConfig & {
  type: 'basic';
  label: string;
};

export type ButtonConfig = IconButtonConfig | RegularButtonConfig;
