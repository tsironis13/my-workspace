import { Assignment } from './user-assignments/dashboard/assignments.component';
import { device } from '../devices/test.component';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

export const admin = { name: 'administration' };

// const x = () => {
//   console.log(management);
// };

// x();

@Component({
  selector: 'my-org-admin',
  imports: [RouterOutlet],
  template: ` <div>admin</div>
    <button (click)="navigateToUsers()">Users</button>
    <button (click)="navigateToAssignments()">Assignments</button>
    <router-outlet />`,
})
export class AdminComponent implements OnInit {
  router = inject(Router);

  ngOnInit(): void {
    const x: Assignment = {
      name: 'test',
    };

    console.log(x);
  }

  navigateToUsers() {
    this.router.navigate(['/administration/users']);
  }

  navigateToAssignments() {
    this.router.navigate(['/administration/assignments']);
  }
}
