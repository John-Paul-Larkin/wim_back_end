import express from "express";
import { createPurchaseOrder, getOrderedIds, getPurchaseOrder } from "../controllers/purchaseOrder";

const purchaseOrderRouter = express.Router();

purchaseOrderRouter
.post("/", (req, res) => createPurchaseOrder(req, res))
.get("/getOrderedIds", (req, res) => getOrderedIds(req, res))
.get("/:id", (req, res) => getPurchaseOrder(req, res))



export default purchaseOrderRouter;



