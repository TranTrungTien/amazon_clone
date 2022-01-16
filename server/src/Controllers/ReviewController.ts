import { Request, Response } from "express";
import mongoose from "mongoose";
import { IProduct } from "../Models/ProductModel";
import ReviewModel from "../Models/ReviewModel";
import { IUser } from "../Models/UserModel";

const ObjectId = mongoose.Types.ObjectId;

export const CreateReview = async (req: Request, res: Response) => {
  const { product_id, user_id, rating, comment } = req.body;
  if (
    !ObjectId.isValid(user_id) ||
    !ObjectId.isValid(product_id) ||
    !rating ||
    !comment
  ) {
    return res.status(400).send("Bad Request");
  } else {
    const review = new ReviewModel({
      product: product_id,
      user: user_id,
      rating: parseInt(rating),
      text: comment,
    });
    try {
      const response = await review.save();
      return res.status(201).send(response);
    } catch (error) {
      console.log({ error });
      return res.status(500).send(error);
    }
  }
};

export const GetReviews = (req: Request, res: Response) => {
  const product_id = req.query.product_id as string;
  if (!ObjectId.isValid(product_id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    try {
      ReviewModel.find({ product: product_id })
        .populate<{ product: IProduct }>("product")
        .populate<{ user: IUser }>("user")
        .exec((err, doc) => {
          if (err) {
            return res.status(500).send({ err });
          } else {
            return res.status(200).send(doc);
          }
        });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};
