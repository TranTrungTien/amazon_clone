import { Request, Response } from "express";
import mongoose from "mongoose";
import CartModel from "../Models/CartModel";
import { IProduct } from "../Models/ProductModel";
import { IUser } from "../Models/UserModel";

const { ObjectId } = mongoose.Types;

export const CreateNewCart = async (req: Request, res: Response) => {
  const { user_id, product_id, price, qty, discount } = req.body;
  if (
    !ObjectId.isValid(user_id) ||
    !ObjectId.isValid(product_id) ||
    !price ||
    !qty
  ) {
    return res.status(400).send("Bad Request");
  } else {
    const cart = new CartModel({
      user: user_id,
      product: product_id,
      price: price,
      quantity: parseInt(qty),
      discount: discount ? parseFloat(discount) : 0,
    });
    try {
      const response = await cart.save();
      res.status(201).send(response);
    } catch (error) {
      res.status(500).send({ error });
    }
  }
};

export const GetAllCartItem = async (req: Request, res: Response) => {
  const { id } = req.user;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Bad Request");
  } else {
    try {
      CartModel.find({ user: id })
        .populate<{ product: IProduct }>("product")
        .populate<{ user: IUser }>("user")
        .then((doc) => {
          return res.status(200).send(doc);
        });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
};

export const GetCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  const product_id = req.query.product_id as string;
  if (!ObjectId.isValid(id) || !ObjectId.isValid(product_id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    CartModel.findOne({ user: id, product: product_id })
      .populate<{ user: IUser }>("user")
      .populate<{ product: IProduct }>("product")
      .exec((err, doc) => {
        console.log({ doc });
        if (err) {
          return res.status(500).send({ err });
        } else {
          return res.status(200).send(doc);
        }
      });
  }
};

export const GetAllCartByIds = async (req: Request, res: Response) => {
  const { id } = req.user;
  const cartIdsParams = req.query.cartIds as string;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    if (!cartIdsParams) {
      return res.status(400).send({ message: "Bad Request" });
    } else {
      const cartIds = decodeURI(cartIdsParams).split(",");
      for (const id of cartIds) {
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Bad Request" });
        }
      }
      CartModel.find({ _id: { $in: [...cartIds] }, user: id })
        .populate<{ user: IUser }>("user")
        .populate<{ product: IProduct }>("product")
        .exec((err, doc) => {
          if (err) {
            return res.status(500).send({ err });
          } else {
            if (doc.length <= 0) {
              return res.status(404).send({ message: "Not Found" });
            } else {
              return res.status(200).send(doc);
            }
          }
        });
    }
  }
};

export const DeleteAllCart = async (req: Request, res: Response) => {
  const { id } = req.user;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    try {
      CartModel.deleteMany({ user: id }, () => {
        return res.status(200).send({ message: "Delete Successfully" });
      });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};
