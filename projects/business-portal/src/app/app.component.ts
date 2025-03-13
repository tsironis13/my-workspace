import { Component } from '@angular/core';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  selector: 'my-org-root',
  imports: [MainLayoutComponent],
  template: `<my-org-main-layout />`,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
