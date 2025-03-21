import { Directive } from '@angular/core';
import { ContextHeaderState } from '../models/dynamic-dialog';

@Directive({
  standalone: true,
  selector: 'ng-template[myOrgDynamicDialogDefaultFooterTemplate]',
})
export class DynamicDialogDefaultFooterTemplateDirective {
  static ngTemplateContextGuard(
    dir: DynamicDialogDefaultFooterTemplateDirective,
    ctx: unknown
  ): ctx is {
    $implicit: ContextHeaderState;
  } {
    return true;
  }
}

@Directive({
  standalone: true,
  selector: 'ng-template[myOrgDynamicDialogCustomFooterTemplate]',
})
export class DynamicDialogCustomFooterTemplateDirective {}
