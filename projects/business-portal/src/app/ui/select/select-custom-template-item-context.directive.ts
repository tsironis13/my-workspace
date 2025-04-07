import { Directive, input } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'ng-template[myOrgSelectCustomTemplateItemContext]',
})
export class SelectCustomTemplateItemContextDirective<T> {
  readonly item = input.required<T>();

  static ngTemplateContextGuard<TContext>(
    dir: SelectCustomTemplateItemContextDirective<TContext>,
    ctx: unknown
  ): ctx is {
    $implicit: TContext;
  } {
    return true;
  }
}
