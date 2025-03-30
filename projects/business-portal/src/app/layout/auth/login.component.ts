import {
  ChangeDetectionStrategy,
  Component,
  viewChild,
  computed,
} from '@angular/core';
import { AuthDirective } from '@business-portal/core/auth';
import { InputComponent, ButtonComponent } from '@business-portal/ui';
import { SubmitButtonDirective } from '@shared/forms';
@Component({
  selector: 'my-org-login',
  imports: [
    InputComponent,
    ButtonComponent,
    AuthDirective,
    SubmitButtonDirective,
  ],
  templateUrl: './login.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  // templateUrl: `<div>Login</div>
  //   <p-button
  //     (click)="
  //       authDirective().signIn('giannis123@hotmail.com', 'fjsfljsjksdffds')
  //     "
  //     myOrgAuth
  //     >Sign In</p-button
  //   >`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected readonly authDirective = viewChild.required(AuthDirective);
  protected readonly loginForm = computed(() => this.authDirective().loginForm);
}
