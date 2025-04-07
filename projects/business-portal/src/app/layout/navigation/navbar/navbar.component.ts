import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChild,
} from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { RouterLink } from '@angular/router';

import { AuthDirective, AuthStore } from '@business-portal/core/auth';
import { DynamicDialogStore } from '@business-portal/pattern';
import { ButtonComponent } from '@business-portal/ui';
import { NavigationStore } from '@business-portal/core/navigation';

@Component({
  selector: 'my-org-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    AuthDirective,
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    StyleClass,
    ButtonComponent,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly authDirective = viewChild.required(AuthDirective);

  protected readonly authStore = inject(AuthStore);
  readonly #dynamicDialogStore = inject(DynamicDialogStore);
  readonly #navigationStore = inject(NavigationStore);

  protected readonly styleClass = computed(() =>
    this.#navigationStore.isSidebarCollapsed() ? 'drawer-collapsed' : ''
  );

  public toggleSidebar(): void {
    this.#navigationStore.toggleSidebar();
  }

  protected signOut(): void {
    this.authDirective().signOut();
    this.#dynamicDialogStore.closeDialog();
  }
}
