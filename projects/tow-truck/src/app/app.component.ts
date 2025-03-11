import { Component } from '@angular/core';
import { StatCardComponent } from './stat-card/stat-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [StatCardComponent],
})
export class AppComponent {
  title = 'tow-truck';
}
