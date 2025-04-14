export type UserDto = {
  id: number;
  name: string;
  email: string;
  familyName: string;
  phoneNumber: string | null;
  active: boolean;
  createdAt: string;
  deletedAt: string | null;
};

export type CreateUserPostDto = {
  name: string;
  familyName: string;
  email: string;
  authUserId: string;
  phoneNumber?: string;
  businessGroupId?: number;
};
