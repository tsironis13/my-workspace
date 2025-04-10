import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DynamicValidatorMessageDirective } from '@shared/forms';
import { TreeNode } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import {
  TreeSelect,
  TreeSelectNodeCollapseEvent,
  TreeSelectNodeExpandEvent,
} from 'primeng/treeselect';

type ExtractString<T> = Extract<keyof T, string>;

@Component({
  selector: 'my-org-app-tree-select',
  imports: [
    ReactiveFormsModule,
    TreeSelect,
    FloatLabel,
    DynamicValidatorMessageDirective,
  ],
  templateUrl: './tree-select.component.html',
  styleUrl: './tree-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectComponent<
  T extends TreeNode,
  F extends { [K in keyof F]: AbstractControl<unknown, unknown> }
> {
  readonly options = input.required<T[]>();
  readonly rootFormGroup = input.required<FormGroup<F>>();
  readonly fControlName = input.required<ExtractString<F>>();
  readonly labelVariant = input<'over' | 'in' | 'on'>('over');
  readonly label = input<string>('');
  readonly loading = input<boolean>(false);

  readonly nodeExpandTriggered = output<TreeSelectNodeExpandEvent>();
  readonly nodeCollapseTriggered = output<TreeSelectNodeCollapseEvent>();

  protected onNodeExpand(event: TreeSelectNodeExpandEvent) {
    this.nodeExpandTriggered.emit(event);
  }

  protected onNodeCollapse(event: TreeSelectNodeCollapseEvent) {
    this.nodeCollapseTriggered.emit(event);
  }
}
