import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationMainComponent } from './main/navigation-main.component';
import { NavbarComponent } from './navbar/navbar.component';
@Component({
  selector: 'my-org-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: ['./navigation-container.component.scss'],
  imports: [NavbarComponent, NavigationMainComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContainerComponent {}
