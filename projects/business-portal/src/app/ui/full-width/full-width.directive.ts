import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[myOrgFullWidth]',
})
export class FullWidthDirective {
  @HostBinding('style.width')
  readonly width = '100%';
}
