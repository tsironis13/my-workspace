import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'my-org-app-progress-loader',
  imports: [Skeleton],
  templateUrl: './progress-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressLoaderComponent {
  readonly loading = input.required<boolean>();
}
