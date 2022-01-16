import express from "express";
import {
  CreateNewCart,
  DeleteAllCart,
  GetAllCartByIds,
  GetAllCartItem,
  GetCart,
} from "../Controllers/CartController";
import { verifyToken } from "../Middlewares/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, CreateNewCart);
router.get("/mycart", verifyToken, GetAllCartItem);
router.get("/checkout-cart", verifyToken, GetAllCartByIds);
router.get("/single-cart", verifyToken, GetCart);
// router.patch("/update");
router.delete("/delete-all", verifyToken, DeleteAllCart);

export default router;
