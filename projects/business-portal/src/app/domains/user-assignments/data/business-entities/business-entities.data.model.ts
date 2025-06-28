import { BusinessEntityTypeCore } from '@business-portal/core/business-entity-types';

export type UserAssignmentsBusinessEntitySummarized = {
  id: number;
  displayName: string;
  type: BusinessEntityTypeCore;
  businessGroupId: number;
  refId: string | null;
};
