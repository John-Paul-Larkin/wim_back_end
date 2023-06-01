import express from "express";
import { deleteProduct, editProduct, getAllProducts } from "../controllers/product";

const productRouter = express.Router();

productRouter
  .get("/", (req, res) => getAllProducts(req, res))
  .post("/", (req, res) => editProduct(req, res))
  .delete("/", (req, res) => deleteProduct(req, res));

export default productRouter;
