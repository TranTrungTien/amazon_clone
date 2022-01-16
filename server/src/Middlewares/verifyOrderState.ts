import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import OrderModel from "../Models/OrderModel";
const ObjectId = mongoose.Types.ObjectId;

export const verifyOrderState = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user;
  const { product_id } = req.body;
  if (!ObjectId.isValid(id) || !ObjectId.isValid(product_id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    try {
      OrderModel.findOne(
        {
          user: id,
          productListId: {
            $in: [product_id],
          },
        },
        null,
        null,
        (err, doc) => {
          console.log({ err });
          console.log({ doc });
          if (err) {
            return res.status(500).send({ err });
          } else {
            if (doc) {
              if (doc.status === "done") {
                return next();
              } else {
                return res.status(403).send({
                  message: "Forbidden Access ! You don't have permission",
                });
              }
            } else {
              return res.status(404).send({
                message: "Not Found Order",
              });
            }
          }
        }
      );
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};
