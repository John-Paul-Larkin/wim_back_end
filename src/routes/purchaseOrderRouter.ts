import express from "express";
import {
  createPurchaseOrder,
  getOrderedIds,
  getPurchaseOrder,
  getReceivedIds,
  setOrderReceived,
  updateQuantityOnReceived,
} from "../controllers/purchaseOrder";

const purchaseOrderRouter = express.Router();

purchaseOrderRouter
  .post("/", (req, res) => createPurchaseOrder(req, res))
  .get("/getOrderedIds", (req, res) => getOrderedIds(req, res))
  .get("/getReceivedIds", (req, res) => getReceivedIds(req, res))
  .get("/:id", (req, res) => getPurchaseOrder(req, res))
  .post("/setReceived/:id", (req, res) => setOrderReceived(req, res))
  .post("/updateQuantityOnReceived/", (req, res) => updateQuantityOnReceived(req, res))
  

export default purchaseOrderRouter;
