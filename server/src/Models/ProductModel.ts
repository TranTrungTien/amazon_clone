import mongoose from "mongoose";

export interface IProduct {
  "Uniq Id": string;
  "Crawl Timestamp": string;
  "Dataset Origin": string;
  "Product Id": string;
  "Product Barcode": string;
  "Product Company Type Source": string;
  "Product Brand Source": string;
  "Product Brand Normalised Source": string;
  "Product Name Source": string;
  "Match Rank": string;
  "Match Score": string;
  "Match Type": string;
  Retailer: string;
  "Product Category": string;
  "Product Brand": string;
  "Product Name": string;
  "Product Price": string;
  ASIN: string;
  Upc: string;
  "Product Url": string;
  Market: string;
  "Product Description": string;
  "Product Currency": string;
  "Product Available Inventory": string;
  "Product Image Url": string;
  "Product Model Number": string;
  "Product Tags": string;
  "Product Contents": string;
  "Product Rating": string;
  "Product Reviews Count": string;
  Bsr: string;
  "Joining Key": string;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  "Uniq Id": {
    type: String,
    default: "",
  },
  "Crawl Timestamp": {
    type: String,
    default: "",
  },
  "Dataset Origin": {
    type: String,
    default: "",
  },
  "Product Id": {
    type: String,
    default: "",
  },
  "Product Barcode": {
    type: String,
    default: "",
  },
  "Product Company Type Source": {
    type: String,
    default: "",
  },
  "Product Brand Source": {
    type: String,
    default: "",
  },
  "Product Brand Normalised Source": {
    type: String,
    default: "",
  },
  "Product Name Source": {
    type: String,
    default: "",
  },
  "Match Rank": {
    type: String,
    default: "",
  },
  "Match Score": {
    type: String,
    default: "",
  },
  "Match Type": {
    type: String,
    default: "",
  },
  Retailer: {
    type: String,
    default: "",
  },
  "Product Category": {
    type: String,
    default: "",
  },
  "Product Brand": {
    type: String,
    default: "",
  },
  "Product Name": {
    type: String,
    default: "",
  },
  "Product Price": {
    type: String,
    default: "",
  },
  ASIN: {
    type: String,
    default: "",
  },
  Upc: {
    type: String,
    default: "",
  },
  "Product Url": {
    type: String,
    default: "",
  },
  Market: {
    type: String,
    default: "",
  },
  "Product Description": {
    type: String,
    default: "",
  },
  "Product Currency": {
    type: String,
    default: "",
  },
  "Product Available Inventory": {
    type: String,
    default: "",
  },
  "Product Image Url": {
    type: String,
    default: "",
  },
  "Product Model Number": {
    type: String,
    default: "",
  },
  "Product Tags": {
    type: String,
    default: "",
  },
  "Product Contents": {
    type: String,
    default: "",
  },
  "Product Rating": {
    type: String,
    default: "",
  },
  "Product Reviews Count": {
    type: String,
    default: "",
  },
  Bsr: {
    type: String,
    default: "",
  },
  "Joining Key": {
    type: String,
    default: "",
  },
});

ProductSchema.index({
  "Product Name": "text",
});

export default mongoose.model<IProduct>("Product", ProductSchema);
