export interface IUserInformation {
  id: number;
  email: string;
  phoneNumber: string;
  password: string;
  premium: boolean;
  banned: boolean;
  banReason: string;
}
