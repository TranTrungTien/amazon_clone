import { Request, Response } from "express";
import UserModel from "../Models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "..", "..", "config.env") });

const ObjectId = mongoose.Types.ObjectId;

export const CreateUser = (req: Request, res: Response) => {
  const username = req.body.username as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  if (!username || !email || !password) {
    return res.status(400).send({ error: "Bad request" });
  }

  try {
    bcrypt.genSalt(15, (err, salt) => {
      if (err) {
        return res.status(500).send({ err });
      } else {
        bcrypt.hash(password, salt, async (err, encryptedPassword) => {
          if (err) {
          } else {
            const user = new UserModel({
              username: username,
              email: email,
              password: encryptedPassword,
            });

            const response = await user.save();
            console.log(response);
            if (response) {
              return res.status(201).send(response);
            } else {
              return res
                .status(500)
                .send({ error: "Cant not create new user" });
            }
          }
        });
      }
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};

export const GetUser = (req: Request, res: Response) => {
  const user = req.user;
  if (ObjectId.isValid(user.id)) {
    UserModel.findById(user.id, null, null, (err, doc) => {
      if (err) {
        return res.status(404).send({ message: "Not Found" });
      } else {
        return res.status(200).send(doc);
      }
    });
  } else {
    return res.status(400).send({ error: "Bad Request" });
  }
};

export const Login = (req: Request, res: Response) => {
  const email = req.body.email as string;
  const password = req.body.password as string;

  try {
    UserModel.findOne({ email: email }, null, null, (err, doc) => {
      if (err) {
        return res.status(404).send("Not Found Account");
      } else {
        if (doc) {
          const encryptedPassword = doc.password ? doc.password : "";
          bcrypt.compare(password, encryptedPassword, (err, same) => {
            if (err) {
              return res.status(400).send({ err });
            } else {
              if (same) {
                const payload = {
                  id: doc._id,
                };
                const token = jwt.sign(
                  payload,
                  process.env.JWT_SECRET as string,
                  { expiresIn: 3600 }
                );

                return res
                  .status(200)
                  .cookie("token", token, {
                    expires: new Date(Date.now() + 3600000),
                    httpOnly: true,
                  })
                  .send({ user: doc });
              } else {
                return res.status(400).send("Email or password is wrong");
              }
            }
          });
        }
      }
    });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ error });
  }
};
export const DeleteCookie = (req: Request, res: Response) => {
  const user = req.user;
  if (ObjectId.isValid(user.id)) {
    res.clearCookie("token");
    return res.status(200).send({ message: "Cookie has been deleted" });
  } else {
    return res.status(400).send({ error: "Bad Request" });
  }
};
