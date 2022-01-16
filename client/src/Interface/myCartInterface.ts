import { IProduct } from "./productInterface";
import { IUser } from "./userInterface";

export interface ICart {
  _id: string;
  product: IProduct;
  user: IUser;
  price: number;
  discount: number;
  note: string;
  quantity: number;
}
