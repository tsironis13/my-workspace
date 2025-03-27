import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { AuthDirective } from '@business-portal/core/auth';

@Component({
  selector: 'my-org-login',
  imports: [ButtonModule, AuthDirective],
  template: `<div>Login</div>
    <p-button
      (click)="
        authDirective().signIn('giannis123@hotmail.com', 'fjsfljsjksdffds')
      "
      myOrgAuth
      >Sign In</p-button
    >`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected readonly authDirective = viewChild.required(AuthDirective);
}
