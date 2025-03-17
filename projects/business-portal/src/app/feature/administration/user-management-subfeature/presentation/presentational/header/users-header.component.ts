import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'my-org-users-header',
  imports: [],
  templateUrl: './users-header.component.html',
  styleUrl: './users-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersHeaderComponent {
  triggerSearch = output<void>();

  onSearch() {
    this.triggerSearch.emit();
  }
}
