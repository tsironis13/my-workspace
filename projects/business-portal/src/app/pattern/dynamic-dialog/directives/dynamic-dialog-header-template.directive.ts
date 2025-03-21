import { Directive } from '@angular/core';
import { ContextHeaderState } from '../models/dynamic-dialog';

@Directive({
  standalone: true,
  selector: 'ng-template[myOrgDynamicDialogDefaultHeaderTemplate]',
})
export class DynamicDialogDefaultHeaderTemplateDirective {
  static ngTemplateContextGuard(
    dir: DynamicDialogDefaultHeaderTemplateDirective,
    ctx: unknown
  ): ctx is {
    $implicit: ContextHeaderState;
  } {
    return true;
  }
}

@Directive({
  standalone: true,
  selector: 'ng-template[myOrgDynamicDialogCustomHeaderTemplate]',
})
export class DynamicDialogCustomHeaderTemplateDirective {}
