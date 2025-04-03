import {
  ChangeDetectionStrategy,
  Component,
  inject,
  viewChild,
} from '@angular/core';

import { AuthDirective, AuthStore } from '@business-portal/core/auth';

@Component({
  selector: 'my-org-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [AuthDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly authDirective = viewChild.required(AuthDirective);

  authStore = inject(AuthStore);
}
