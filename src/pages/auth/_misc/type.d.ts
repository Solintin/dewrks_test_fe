export interface IAdminLogin {
  user: User;
  accessToken: string;
}

export interface User {
  name: string;
  email: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
