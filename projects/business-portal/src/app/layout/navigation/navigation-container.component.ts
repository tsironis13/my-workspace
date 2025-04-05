import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';

import { NavigationMainComponent } from './main/navigation-main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavigationStore } from '@business-portal/core/navigation';

@Component({
  selector: 'my-org-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss'],
  imports: [NavbarComponent, NavigationMainComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContainerComponent {
  readonly #navigationStore = inject(NavigationStore);

  @HostBinding('class.drawer-expanded')
  get sidebarState() {
    return this.#navigationStore.isSidebarCollapsed();
  }
}
