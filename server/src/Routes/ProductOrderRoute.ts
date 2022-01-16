import express from "express";
import {
  CreateProductOrder,
  DeleteProductOrder,
  GetProductOrder,
} from "../Controllers/ProductOrderController";
import { verifyToken } from "../Middlewares/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, CreateProductOrder);
router.get("/get-product-order", verifyToken, GetProductOrder);
router.delete("/delete-product-order", verifyToken, DeleteProductOrder);

export default router;
