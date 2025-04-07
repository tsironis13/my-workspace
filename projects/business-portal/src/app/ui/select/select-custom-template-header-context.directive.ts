import { Directive } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'ng-template[myOrgSelectCustomTemplateHeaderContext]',
})
export class SelectCustomTemplateHeaderContextDirective {
  static ngTemplateContextGuard(
    dir: SelectCustomTemplateHeaderContextDirective,
    ctx: unknown
  ): ctx is {
    $implicit: unknown;
  } {
    return true;
  }
}
