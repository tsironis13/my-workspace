import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { injectTrpcClient } from '@business-portal/frontend';

@Component({
  selector: 'my-org-main-layout',
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  title = 'business-portal';

  // trpcClient = injectTrpcClient();

  // ngOnInit(): void {
  //   this.callApi();
  // }

  // async callApi(): Promise<void> {
  //   const x = await this.trpcClient.todos.all.query();
  //   console.log(x);

  //   const y = await this.trpcClient.productCategory.getById.query(4);
  //   console.log(y);
  // }
}
