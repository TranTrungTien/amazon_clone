import express from "express";
import { CreateReview, GetReviews } from "../Controllers/ReviewController";
import { verifyOrderState } from "../Middlewares/verifyOrderState";
import { verifyToken } from "../Middlewares/verifyToken";

const router = express.Router();

router.post("/create", verifyToken, verifyOrderState, CreateReview);
router.get("/get-reviews", verifyToken, GetReviews);
// router.patch("/update");
// router.delete("/delete");

export default router;
