export type UserApiResponseItem = {
  id: number;
  name: string;
  email: string;
  familyName: string | null;
  phoneNumber: string | null;
  active: boolean;
  createdAt: string;
  deletedAt: string | null;
};
