import mongoose, { Schema, Types } from "mongoose";

export interface ICreditCard {
  acceptedCard: string;
  ownName: string;
  cardNumber: string;
  expiredMonth: string;
  expiredYear: string;
  cvv: string;
}

interface IOrder {
  productListOrdered: Types.ObjectId[];
  productListId: string[];
  user: Types.ObjectId;
  fullName: string;
  status: "processing" | "shipping" | "done";
  totalPrice: number;
  totalDiscount: number;
  note: string;
  country: string;
  street: string;
  state: string;
  zip: string;
  phoneNumber: string;
  creditCard: ICreditCard;
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
    productListOrdered: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProductOrder",
      },
    ],
    productListId: [
      {
        type: String,
        required: true,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "processing",
    },
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    note: String,
    creditCard: {
      type: {} as ICreditCard,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
