import { ICreditCard } from "./creditCardInterface";
import { IProductOrder } from "./productOrder";
import { IUser } from "./userInterface";

export interface IMyOrder {
  _id?: string;
  productListOrdered: IProductOrder[];
  productListId: string[];
  user: IUser;
  status: "confirmed" | "processing" | "shipping" | "done";
  totalPrice: number;
  totalDiscount: number;
  note: string;
  country: string;
  street: string;
  state: string;
  zip: string;
  phoneNumber: string;
  creditCardInfo: ICreditCard;
}
