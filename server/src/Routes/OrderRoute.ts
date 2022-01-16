import express from "express";
import {
  CheckOrder,
  CreateOrder,
  DeleteOrder,
  GetOrders,
} from "../Controllers/OrderController";
import { verifyToken } from "../Middlewares/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, CreateOrder);
router.get("/get-orders", verifyToken, GetOrders);
router.delete("/delete", verifyToken, DeleteOrder);
router.get("/check-permission-to-review", verifyToken, CheckOrder);

export default router;
