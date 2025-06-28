export type UserAssignmentEntity = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  scopeName: string;
  scopeType: string;
  createdAt: string;
};

export type UserAssignmentFilter = { scopeType: string };
