import { Request, Response } from "express";
import mongoose from "mongoose";
import ProductOrderModel from "../Models/ProductOrderModel";

const ObjectId = mongoose.Types.ObjectId;

export const CreateProductOrder = async (req: Request, res: Response) => {
  const productId = req.body.product as string;
  const price = req.body.price as string;
  const note = req.body.note as string;
  const discount = req.body.discount as string;
  const quantity = req.body.quantity as string;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).send({ message: "Bad Request" });
  }

  const productOrder = new ProductOrderModel({
    product: productId,
    price: parseFloat(price),
    discount: parseInt(discount),
    note: note,
    quantity: parseInt(quantity),
  });

  try {
    const response = await productOrder.save();
    return res.status(200).send(response);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};
export const GetProductOrder = (req: Request, res: Response) => {};
export const DeleteProductOrder = (req: Request, res: Response) => {};
