import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { injectTrpcClient } from '@business-portal/frontend';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'business-portal';

  trpcClient = injectTrpcClient();

  ngOnInit(): void {
    this.callApi();
  }

  async callApi(): Promise<void> {
    const x = await this.trpcClient.todos.all.query();
    console.log(x);

    const y = await this.trpcClient.productCategory.getById.query(4);
    console.log(y);
  }
}
