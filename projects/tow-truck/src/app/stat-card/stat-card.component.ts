import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  header = input.required<string>();
  data = input.required<string>();
  footer = input.required<string>();
}
