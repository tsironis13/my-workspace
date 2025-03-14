export type UserApiResponse = {
  items: {
    id: number;
    todo: string;
    done: boolean;
  }[];
  totalCount: number;
};
