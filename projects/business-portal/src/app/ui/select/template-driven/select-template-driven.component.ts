import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'my-org-app-select-template-driven',
  templateUrl: './select-template-driven.component.html',
  imports: [SelectModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTemplateDrivenComponent<T> {
  readonly options = input.required<T[]>();
  readonly model = model.required();
  readonly appendTo = input<HTMLElement | string>('body');

  readonly valueChanged = output<SelectChangeEvent>();
}
