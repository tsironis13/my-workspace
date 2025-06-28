import { BusinessEntityTypeCoreDto } from '@business-portal/core/business-entity-types';

export type UserAssignmentsBusinessEntitySummarizedDto = {
  id: number;
  displayName: string;
  type: BusinessEntityTypeCoreDto;
  businessGroupId: number;
  refId: string | null;
};
