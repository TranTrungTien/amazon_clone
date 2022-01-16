import mongoose, { Types } from "mongoose";

interface IReview {
  product: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  rating: number;
  text: string;
}

const ReviewSchema = new mongoose.Schema<IReview>(
  {
    product: {
      type: "ObjectId",
      ref: "Product",
    },
    user: {
      type: "ObjectId",
      ref: "User",
    },
    rating: {
      type: Number,
      default: 0,
    },
    text: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", ReviewSchema);
