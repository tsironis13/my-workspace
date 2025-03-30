import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from 'primeng/toast';

import { AuthDirective } from '@business-portal/core/auth';
import {
  GlobalLoaderComponent,
  GlobalLoaderStore,
} from '@shared/global-loader';

@Component({
  selector: 'my-org-root',
  imports: [RouterOutlet, GlobalLoaderComponent, Toast],
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  hostDirectives: [AuthDirective],
})
export class AppComponent {
  protected readonly globalLoaderStore = inject(GlobalLoaderStore);
}
