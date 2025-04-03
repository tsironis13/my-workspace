import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  ButtonComponent,
  ButtonConfigViewModel,
  SkeletonLoaderComponent,
} from '@business-portal/ui';
import { SubmitButtonDirective } from '@shared/forms';

@Component({
  selector: 'my-org-app-dynamic-dialog-footer',
  templateUrl: './footer.component.html',
  imports: [ButtonComponent, SubmitButtonDirective, SkeletonLoaderComponent],
  styles: [
    `
      :host {
        @apply w-full;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicDialogFooterComponent {
  readonly leftButtonConfig = input.required<ButtonConfigViewModel>();
  readonly rightButtonConfig = input.required<ButtonConfigViewModel>();
  readonly validateDialogOnSubmit = input<boolean>(true);
  readonly dialogForm = input<FormGroup>();
  readonly isDialogLoading = input<boolean>(false);

  readonly leftButtonClicked = output<void>();
  readonly rightButtonClicked = output<void>();

  protected readonly form = computed(() => {
    return <FormGroup>this.dialogForm();
  });
}
