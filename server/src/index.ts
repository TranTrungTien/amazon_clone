import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRouter from "./Routes/ProducRoute";
import UserRouter from "./Routes/UserRoute";
import CartRouter from "./Routes/CartRoute";
import OrderRouter from "./Routes/OrderRoute";
import ProductOrderRouter from "./Routes/ProductOrderRoute";
import ReviewRouter from "./Routes/ReviewRoute";
import { DBConnect } from "./Helpers/DatabaseConnection";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "config.env") });

DBConnect();

const PORT = process.env.PORT || 4000;

const app: Application = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/product-orders", ProductOrderRouter);
app.use("/api/reviews", ReviewRouter);

app.get("/", (req, res) => {
  return res.send("Home api");
});
app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
