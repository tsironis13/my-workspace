import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { ValidationErrors } from '@angular/forms';

import { ErrorMessagePipe } from '../../pipes/error-message.pipe';

@Component({
  selector: 'my-org-app-input-error',
  standalone: true,
  imports: [CommonModule, ErrorMessagePipe],
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorComponent {
  readonly errors = input<ValidationErrors | undefined | null>();

  trackByFn(index: number, item: KeyValue<string, unknown>) {
    return item.key;
  }
}
