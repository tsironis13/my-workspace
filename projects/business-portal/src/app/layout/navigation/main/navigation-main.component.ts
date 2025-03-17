import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'my-org-navigation-main',
  imports: [RouterOutlet],
  templateUrl: './navigation-main.component.html',
  styleUrl: './navigation-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMainComponent {
  title = 'business-portal';
}
