import express from "express";
import {
  editSaleOrder,
  getOrderPickedIds,
  getOrderReceivedIds,
  getOrderSentIds,
  getSaleOrders,
  setOrderPicked,
  setOrderSent,
  updateQuantityOnSent,
} from "../controllers/SaleOrder";

const supplierRouter = express.Router();

supplierRouter
  .post("/", (req, res) => editSaleOrder(req, res))
  .get("/getOrderReceivedIds", (req, res) => getOrderReceivedIds(req, res))
  .get("/getOrderPickedIds", (req, res) => getOrderPickedIds(req, res))
  .get("/getOrderSentIds", (req, res) => getOrderSentIds(req, res))
  .get("/:id", (req, res) => getSaleOrders(req, res))
  .post("/setPicked/:id", (req, res) => setOrderPicked(req, res))
  .post("/setSent/", (req, res) => setOrderSent(req, res))
  .post("/updateQuantityOnSent/", (req, res) => updateQuantityOnSent(req, res));

export default supplierRouter;
