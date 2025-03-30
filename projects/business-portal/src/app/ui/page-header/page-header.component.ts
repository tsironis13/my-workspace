import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'my-org-app-page-header',
  imports: [NgTemplateOutlet],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  readonly title = input.required<string>();

  protected readonly actionsTemplate = contentChild.required(TemplateRef);
}
