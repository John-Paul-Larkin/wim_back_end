import express from "express";
import { deleteCustomer, editCustomer, getAllCustomers } from "../controllers/customer";

const customerRouter = express.Router();

customerRouter
  .get("/", (req, res) => getAllCustomers(req, res))
  .post("/", (req, res) => editCustomer(req, res))
  .delete("/", (req, res) => deleteCustomer(req, res));

export default customerRouter;
