import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-org-login',
  template: `<div>Login</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
