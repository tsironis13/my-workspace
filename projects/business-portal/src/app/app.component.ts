import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthDirective } from '@business-portal/core/auth';

@Component({
  selector: 'my-org-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
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
export class AppComponent {}
