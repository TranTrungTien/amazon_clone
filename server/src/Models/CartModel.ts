import mongoose, { Schema, Types } from "mongoose";

export interface ICart {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  user: Types.ObjectId;
  price: number;
  discount: number;
  note: string;
  quantity: number;
}

const CartSchema = new mongoose.Schema<ICart>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    note: String,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", CartSchema);
