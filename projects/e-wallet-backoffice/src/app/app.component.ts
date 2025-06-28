import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DB } from './internal/db';

export type X = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'e-wallet-backoffice';

  x: DB = {
    id: '1',
    name: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
