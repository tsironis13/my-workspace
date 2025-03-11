import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-stat-table',
  imports: [],
  templateUrl: './stat-table.component.html',
  styles: ``,
})
export class StatTableComponent {
  rows = signal([]);
  columns = signal(['col1', 'col2', 'col3']);
}
