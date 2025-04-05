import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'my-org-app-divider',
  imports: [Divider],
  templateUrl: './divider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  readonly styleClass = input<string>();
}
