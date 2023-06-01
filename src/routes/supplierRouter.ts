import express from "express";
import { deleteSupplier, editSupplier, getAllSuppliers } from "../controllers/supplier";

const supplierRouter = express.Router();

supplierRouter
  .get("/", (req, res) => getAllSuppliers(req, res))
  .post("/", (req, res) => editSupplier(req, res))
  .delete("/", (req, res) => deleteSupplier(req, res));

export default supplierRouter;
