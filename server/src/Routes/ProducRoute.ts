import express from "express";
import {
  CountProductsByCategory,
  CountProductsByCategoryAndKeyWords,
  CountProductsByKeyWords,
  GetCategories,
  GetProduct,
  SearchProductsByCategory,
  SearchProductsByCategoryAndKeyWord,
  SearchProductsByKeyWord,
} from "../Controllers/ProductController";
const Router = express.Router();

Router.get("/", GetProduct);
Router.get("/search-by-keyword", SearchProductsByKeyWord);
Router.get(
  "/search-by-keyword-and-category",
  SearchProductsByCategoryAndKeyWord
);
Router.get("/search-by-category", SearchProductsByCategory);
Router.get("/count-products-by-category", CountProductsByCategory);
Router.get("/count-products-by-keyword", CountProductsByKeyWords);
Router.get(
  "/count-products-by-category-and-keyword",
  CountProductsByCategoryAndKeyWords
);
Router.get("/categories", GetCategories);

export default Router;
