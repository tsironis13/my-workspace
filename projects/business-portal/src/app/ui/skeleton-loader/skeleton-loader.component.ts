import {
  Component,
  input,
  ChangeDetectionStrategy,
  computed,
} from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'my-org-app-skeleton-loader',
  imports: [Skeleton],
  templateUrl: './skeleton-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoaderComponent {
  readonly loading = input.required<boolean>();
  readonly width = input<string>();

  protected readonly skeletonWidth = computed(() => this.width() ?? '100%');
}
