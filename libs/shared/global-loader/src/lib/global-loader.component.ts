import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GlobalLoaderStore } from './global-loader.store';

@Component({
  selector: 'my-org-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalLoaderComponent {
  protected readonly globalLoaderStore = inject(GlobalLoaderStore);
}
