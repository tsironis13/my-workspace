import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'my-org-app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly label = input.required<string>();

  readonly clickTriggered = output<void>();
}
