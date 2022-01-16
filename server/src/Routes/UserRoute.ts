import express from "express";
import {
  CreateUser,
  DeleteCookie,
  GetUser,
  Login,
} from "../Controllers/UserController";
import { verifyToken } from "../Middlewares/verifyToken";

const router = express.Router();

router.post("/create", CreateUser);
router.get("/get", verifyToken, GetUser);
router.post("/login", Login);
router.delete("/delete-cookie", verifyToken, DeleteCookie);
// router.patch("/update");
// router.delete("/delete");

export default router;
