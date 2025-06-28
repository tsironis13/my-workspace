import {
  AssignableUserRole,
  AssignableUserRoles,
} from '@business-portal/user-assignments/data';

export const GLOBAL = 'Global';
export const EXPANDABLE_ITEM_CLASS = 'expandable';
export const NON_EXPANDABLE_ITEM_CLASS = 'non-expandable';

export type ScopeTreeSelectConfig = {
  showGlobal: boolean;
  expandableBusinessGroups: boolean;
  selectableBusinessGroups: boolean;
  expandableBusinessEntities: boolean;
  selectableBusinessEntities: boolean;
};

export type RolesToScopeTreeSelectConfig = Record<
  AssignableUserRole,
  ScopeTreeSelectConfig
>;

export const rolesToScopeTreeSelectConfig: RolesToScopeTreeSelectConfig = {
  [AssignableUserRoles.SuperAdmin]: {
    showGlobal: true,
    expandableBusinessGroups: false,
    selectableBusinessGroups: false,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.BusinessGroupOperator]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.ReadOnlyOperator]: {
    showGlobal: true,
    expandableBusinessGroups: true,
    selectableBusinessGroups: true,
    expandableBusinessEntities: true,
    selectableBusinessEntities: true,
  },
  [AssignableUserRoles.SubDistributor]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.Executive]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.BusinessEntityAdmin]: {
    showGlobal: false,
    expandableBusinessGroups: true,
    selectableBusinessGroups: false,
    expandableBusinessEntities: false,
    selectableBusinessEntities: true,
  },
  [AssignableUserRoles.LocationAdmin]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.BankTransferCreator]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.FinancialOfficer]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.ReportingAgent]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.OnlineAgent]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.BankTransferApprover]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
  [AssignableUserRoles.BusinessGroupAdmin]: {
    showGlobal: false,
    expandableBusinessGroups: false,
    selectableBusinessGroups: true,
    expandableBusinessEntities: false,
    selectableBusinessEntities: false,
  },
};
