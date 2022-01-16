import { Request, Response } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import OrderModel, { ICreditCard } from "../Models/OrderModel";
import { IProductOrder } from "../Models/ProductOrderModel";
import { IUser } from "../Models/UserModel";

const ObjectId = mongoose.Types.ObjectId;

export const CreateOrder = async (req: Request, res: Response) => {
  const { id } = req.user;
  const productIDList = req.body.productIDList as string[];
  const productListId = req.body.productListId as string[];
  const price = req.body.price as string;
  const discount = req.body.discount as string;
  const fullName = req.body.fullName as string;
  const note = req.body.note as string;
  const country = req.body.country as string;
  const street = req.body.street as string;
  const state = req.body.state as string;
  const zip = req.body.zip as string;
  const phoneNumber = req.body.phoneNumber as string;
  const creditCardInfo = req.body.creditCardInfo as ICreditCard;
  for (const p_id of productIDList) {
    if (!ObjectId.isValid(p_id)) {
      return res.status(400).send({ message: "Bad Request" });
    }
  }

  const order = new OrderModel({
    productListOrdered: productIDList,
    productListId: productListId,
    user: id,
    fullName: fullName,
    status: "confirmed",
    totalPrice: parseFloat(price),
    totalDiscount: parseFloat(discount),
    note: note,
    country: country,
    street: street,
    state: state,
    zip: zip,
    phoneNumber: phoneNumber,
    creditCard: creditCardInfo,
  });

  try {
    const response = await order.save();
    return res.status(200).send(response);
  } catch (error) {
    console.log({ "what happened : ": error });
    res.status(500).send({ error });
  }
};
export const GetOrders = (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    OrderModel.find({ user: id })
      .populate<{ productListOrdered: IProductOrder[] }>({
        path: "productListOrdered",
        model: "ProductOrder",
        populate: {
          path: "product",
          model: "Product",
        },
      })
      .populate<{ user: IUser }>("user")
      .exec((err, doc) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).send(doc);
        }
      });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};

export const CheckOrder = (req: Request, res: Response) => {
  const id = req.user.id;
  const product_id = req.query.product_id as string;
  if (!ObjectId.isValid(id) || !ObjectId.isValid(product_id)) {
    return res.status(400).send({ message: "Bad request" });
  } else {
    try {
      OrderModel.find(
        {
          user: id,
          productListId: {
            $in: [product_id],
          },
        },
        (err, doc) => {
          console.log({ doc });
          if (err) {
            return res.status(500).send({ err });
          } else {
            if (doc.length > 0) {
              doc.forEach((d) => {
                if (d.status === "done") {
                  return res.status(200).send({ message: "Ok" });
                }
              });
            } else {
              return res.status(403).send({ message: "Access Denied" });
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

export const DeleteOrder = (req: Request, res: Response) => {};
