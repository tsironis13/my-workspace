import { Pipe, PipeTransform } from '@angular/core';

import { BusinessGroupCore } from '@business-portal/core/business-groups';
import { SelectItemViewModel } from '@business-portal/ui';

@Pipe({
  name: 'businessGroupCoreToSelectViewModelItem',
})
export class BusinessGroupCoreToSelectViewModelItemPipe
  implements PipeTransform
{
  transform(
    businessGroupsCore: BusinessGroupCore | BusinessGroupCore[]
  ): SelectItemViewModel[] {
    return Array.isArray(businessGroupsCore)
      ? businessGroupsCore.map(this.mapBusinessGroupCoreToSelectViewModelItem)
      : [this.mapBusinessGroupCoreToSelectViewModelItem(businessGroupsCore)];
  }

  private mapBusinessGroupCoreToSelectViewModelItem(
    businessGroupCore: BusinessGroupCore
  ): SelectItemViewModel {
    return {
      label: businessGroupCore.name,
      value: businessGroupCore.id,
    };
  }
}
