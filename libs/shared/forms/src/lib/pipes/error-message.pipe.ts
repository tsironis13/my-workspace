import { inject, Pipe, PipeTransform } from '@angular/core';
import { VALIDATION_ERROR_MESSAGES } from '../tokens/validation-error-messages.token';

@Pipe({
  name: 'errorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  readonly #errorMessages = inject(VALIDATION_ERROR_MESSAGES);

  transform(key: string, errValue: { requiredLength?: number }): string {
    if (!this.#errorMessages[key]) {
      console.warn(`Missing message for ${key} validator...`);
      return '';
    }
    return this.#errorMessages[key](errValue);
  }
}
