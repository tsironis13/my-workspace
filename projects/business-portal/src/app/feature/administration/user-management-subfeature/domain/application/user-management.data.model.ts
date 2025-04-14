export type UserEntity = {
  id: number;
  name: string;
  email: string;
  familyName: string;
  phoneNumber: string | null;
  active: boolean;
  createdAt: string;
  deletedAt: string | null;
};

export type UserFilter = { active: boolean };
