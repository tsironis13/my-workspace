import { Routes } from '@angular/router';
//import { DevicesComponent } from './devices.component';

import { Component, OnInit } from '@angular/core';

export const device = { id: 1 };

@Component({
  selector: 'my-org-devices',
  imports: [],
  template: `<div>device</div>`,
})
export class DevicesComponent implements OnInit {
  ngOnInit(): void {
    console.log(device);
  }
}

export default <Routes>[
  {
    path: '',
    component: DevicesComponent,
  },
];
