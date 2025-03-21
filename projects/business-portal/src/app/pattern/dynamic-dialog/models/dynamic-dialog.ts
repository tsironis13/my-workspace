export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ContextState = {
  header: ContextHeaderState;
};

export type ContextHeaderState = {
  title: string;
  subheading: string;
};

export type ContextFooterState = {
  button: {
    label: string;
  };
};

export type DynamicDialogConfig<F, D> = {
  form: F;
  data: D;
  contextState: DeepPartial<ContextState>;
  inputValues?: Record<string, unknown>;
  position?: 'right' | 'bottom' | 'top' | 'left';
  styleClass?: string;
};

export type DynamicDialogFunc<F> = (
  form: F,
  params?: Record<string, unknown>
) => void;
