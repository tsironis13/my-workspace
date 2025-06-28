import { UserAssignmentsUserRoleRoleScope } from '../user-role-role-scopes/user-role-role-scopes.data.model';

export type UserAssignmentsAssignableUserRole = {
  id: number;
  name: AssignableUserRole;
  isInternal: boolean;
  scopes: UserAssignmentsUserRoleRoleScope[];
};

export const AssignableUserRoles = <const>{
  SuperAdmin: 'Super Admin',
  BusinessGroupAdmin: 'Business Group Admin',
  BusinessGroupOperator: 'Business Group Operator',
  ReadOnlyOperator: 'Read-only Operator',
  SubDistributor: 'Sub Distributor',
  Executive: 'Executive',
  BusinessEntityAdmin: 'Business Entity Admin',
  FinancialOfficer: 'Financial Officer',
  ReportingAgent: 'Reporting Agent',
  OnlineAgent: 'Online Agent',
  LocationAdmin: 'Location Admin',
  BankTransferCreator: 'Bank Transfer Creator',
  BankTransferApprover: 'Bank Transfer Approver',
};

export type AssignableUserRole =
  (typeof AssignableUserRoles)[keyof typeof AssignableUserRoles];
