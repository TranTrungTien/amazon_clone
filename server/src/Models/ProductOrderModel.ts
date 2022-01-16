import mongoose, { Schema } from "mongoose";

export interface IProductOrder {
  product: Schema.Types.ObjectId;
  price: number;
  discount: number;
  note: string;
  quantity: number;
}

const ProductOrderSchema = new mongoose.Schema<IProductOrder>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    note: String,
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductOrder", ProductOrderSchema);
