import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

import {
  ButtonConfig,
  IconButtonConfig,
  BaseButtonConfig,
} from './button.type';

@Component({
  selector: 'my-org-app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly buttonConfig = input.required<ButtonConfig>();

  readonly clickTriggered = output<void>();

  protected readonly basicButtonConfig = computed<BaseButtonConfig>(() =>
    this.buttonConfig()
  );
  protected readonly iconButtonConfig = computed<IconButtonConfig>(
    () => <IconButtonConfig>this.buttonConfig()
  );
}
