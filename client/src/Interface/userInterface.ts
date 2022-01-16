export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  profileImg?: string;
  role: string;
  intro?: string;
}
