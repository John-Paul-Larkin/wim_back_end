import express from "express";
import {
  createSaleOrder,
  getOrderPickedIds,
  getOrderReceivedIds,
  getOrderSentIds,
  getSaleOrder,
  setOrderPicked,
  setOrderSent,
  updateQuantityOnSent,
} from "../controllers/saleOrder";

const saleOrderRouter = express.Router();

saleOrderRouter
  .post("/", (req, res) => createSaleOrder(req, res))
  .get("/getOrderReceivedIds", (req, res) => getOrderReceivedIds(req, res))
  .get("/getOrderPickedIds", (req, res) => getOrderPickedIds(req, res))
  .get("/getOrderSentIds", (req, res) => getOrderSentIds(req, res))
  .get("/:id", (req, res) => getSaleOrder(req, res))
  .post("/setPicked/:id", (req, res) => setOrderPicked(req, res))
  .post("/setSent/", (req, res) => setOrderSent(req, res))
  .post("/updateQuantityOnSent/", (req, res) => updateQuantityOnSent(req, res));

export default saleOrderRouter;
