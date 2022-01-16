import { IProduct } from "./productInterface";
import { IUser } from "./userInterface";

export interface IReview {
  product: IProduct;
  user: IUser;
  title: string;
  rating: number;
  text: string;
}
