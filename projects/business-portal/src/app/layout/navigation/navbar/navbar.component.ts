import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-org-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
