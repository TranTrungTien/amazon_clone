import { Request, Response } from "express";
import mongoose from "mongoose";
import ProductModel from "../Models/ProductModel";
import fs from "fs";

const ObjectId = mongoose.Types.ObjectId;

export const GetProduct = (req: Request, res: Response) => {
  const id = req.query.id as string;
  console.log({ id });
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ error_message: "Bad Request" });
  }
  try {
    ProductModel.findById(id, null, null, (error, doc) => {
      if (error) {
        console.log({ error });
        return res.status(404).send({ error });
      } else {
        return res.status(200).send(doc);
      }
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};

export const CountProductsByCategory = async (req: Request, res: Response) => {
  const category = decodeURI(req.query.category as string);
  try {
    const count = await ProductModel.find({
      "Product Category": { $regex: ".*" + category + ".*" },
    }).count();
    res.status(200).send(count.toString());
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};

export const CountProductsByKeyWords = async (req: Request, res: Response) => {
  const query = decodeURI(req.query.q as string);
  try {
    const count = await ProductModel.find({
      $text: {
        $search: query,
      },
    }).count();
    res.status(200).send(count.toString());
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};

export const CountProductsByCategoryAndKeyWords = async (
  req: Request,
  res: Response
) => {
  const category = decodeURI(req.query.category as string);
  const query = decodeURI(req.query.q as string);
  try {
    const count = await ProductModel.find({
      "Product Category": { $regex: ".*" + category + ".*" },
      $text: {
        $search: query,
      },
    }).count();
    res.status(200).send(count.toString());
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};

export const SearchProductsByCategory = (req: Request, res: Response) => {
  const category = decodeURI(req.query.category as string);
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);

  try {
    ProductModel.aggregate([
      {
        $match: {
          "Product Category": { $regex: ".*" + category + ".*" },
        },
      },
      { $skip: limit * page },
      { $limit: limit },
    ]).exec((error, doc) => {
      if (error) {
        return res.status(500).send({ error });
      } else {
        return res.status(200).send(doc);
      }
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }

  // try {
  //   ProductModel.find({
  //     "Product Category": { $regex: ".*" + category + ".*" },
  //   })
  //     .limit(limit)
  //     .exec((error, doc) => {
  //       if (error) {
  //         return res.status(404).send({ error });
  //       } else {
  //         return res.status(200).send(doc);
  //       }
  //     });
  // } catch (error) {
  //   console.log({ error });
  //   return res.status(500).send({ error });
  // }
};

export const SearchProductsByCategoryAndKeyWord = (
  req: Request,
  res: Response
) => {
  const query = decodeURI(req.query.q as string);
  const category = decodeURI(req.query.category as string);
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);

  try {
    ProductModel.aggregate([
      {
        $match: {
          "Product Category": { $regex: ".*" + category + ".*" },
          $text: {
            $search: query,
          },
        },
      },
      { $skip: limit * page },
      { $limit: limit },
    ]).exec((error, doc) => {
      if (error) {
        return res.status(500).send({ error });
      } else {
        return res.status(200).send(doc);
      }
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }

  // try {
  //   ProductModel.find({
  //     "Product Category": { $regex: ".*" + category + ".*" },
  //     $text: {
  //       $search: query,
  //     },
  //   })
  //     .limit(limit)
  //     .exec((error, doc) => {
  //       if (error) {
  //         return res.status(404).send({ error });
  //       } else {
  //         return res.status(200).send(doc);
  //       }
  //     });
  // } catch (error) {
  //   console.log({ error });
  //   return res.status(500).send({ error });
  // }
};

export const SearchProductsByKeyWord = (req: Request, res: Response) => {
  const query = decodeURI(req.query.q as string);
  const limit = Number(req.query.limit);
  const page = Number(req.query.page);

  try {
    ProductModel.aggregate([
      {
        $match: {
          $text: {
            $search: query,
          },
        },
      },
      { $skip: limit * page },
      { $limit: limit },
    ]).exec((error, doc) => {
      if (error) {
        return res.status(500).send({ error });
      } else {
        return res.status(200).send(doc);
      }
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }

  // try {
  //   ProductModel.find({
  //     $text: {
  //       $search: query,
  //     },
  //   })
  //     .limit(limit)
  //     .exec((error, doc) => {
  //       if (error) {
  //         return res.status(404).send({ error });
  //       } else {
  //         return res.status(200).send(doc);
  //       }
  //     });
  // } catch (error) {
  //   console.log({ error });
  //   return res.status(500).send({ error });
  // }
};

export const GetCategories = (req: Request, res: Response) => {
  console.log("cate........");
  try {
    ProductModel.find(
      {},
      {
        _id: 0,
        "Uniq Id": 0,
        "Crawl Timestamp": 0,
        "Dataset Origin": 0,
        "Product Id": 0,
        "Product Barcode": 0,
        "Product Company Type Source": 0,
        "Product Brand Source": 0,
        "Product Brand Normalised Source": 0,
        "Product Name Source": 0,
        "Match Rank": 0,
        "Match Score": 0,
        "Match Type": 0,
        Retailer: 0,
        "Product Brand": 0,
        "Product Name": 0,
        "Product Price": 0,
        ASIN: 0,
        Upc: 0,
        "Product Url": 0,
        Market: 0,
        "Product Description": 0,
        "Product Currency": 0,
        "Product Available Inventory": 0,
        "Product Image Url": 0,
        "Product Model Number": 0,
        "Product Tags": 0,
        "Product Contents": 0,
        "Product Rating": 0,
        "Product Reviews Count": 0,
        Bsr: 0,
        "Joining Key": 0,
        "Pack Size Or Quantity": 0,
        Mrp: 0,
        "Site Name": 0,
        Offers: 0,
        "Combo Offers": 0,
        "Stock Availibility": 0,
        "Product Asin": 0,
      }
    ).exec((error, doc) => {
      if (error) {
        return res.status(500).send({ error });
      }
      fs.appendFile(
        "categories.json",
        JSON.stringify(doc),
        { encoding: "utf8" },
        (err) => {
          if (err) {
            return res.status(500).send({ err });
          } else {
            return res.status(200).send("Successfully");
          }
        }
      );
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};
