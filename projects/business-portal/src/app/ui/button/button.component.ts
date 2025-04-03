import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

import {
  ButtonConfigViewModel,
  IconButtonConfigViewModel,
  BaseButtonConfigViewModel,
} from './button.view.model';

@Component({
  selector: 'my-org-app-button',
  imports: [ButtonModule],
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly buttonConfig = input.required<ButtonConfigViewModel>();

  readonly clickTriggered = output<void>();

  protected readonly basicButtonConfig = computed<BaseButtonConfigViewModel>(
    () => this.buttonConfig()
  );
  protected readonly iconButtonConfig = computed<IconButtonConfigViewModel>(
    () => <IconButtonConfigViewModel>this.buttonConfig()
  );
}
