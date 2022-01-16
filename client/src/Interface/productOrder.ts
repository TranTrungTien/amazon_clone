import { IProduct } from "./productInterface";

export interface IProductOrder {
  _id?: string;
  product: IProduct;
  price: number;
  discount: number;
  note: string;
  quantity: number;
}
