"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SaleOrder_1 = require("../controllers/SaleOrder");
const supplierRouter = express_1.default.Router();
supplierRouter
    .post("/", (req, res) => (0, SaleOrder_1.editSaleOrder)(req, res))
    .get("/getOrderReceivedIds", (req, res) => (0, SaleOrder_1.getOrderReceivedIds)(req, res))
    .get("/getOrderPickedIds", (req, res) => (0, SaleOrder_1.getOrderPickedIds)(req, res))
    .get("/getOrderSentIds", (req, res) => (0, SaleOrder_1.getOrderSentIds)(req, res))
    .get("/:id", (req, res) => (0, SaleOrder_1.getSaleOrders)(req, res))
    .post("/setPicked/:id", (req, res) => (0, SaleOrder_1.setOrderPicked)(req, res))
    .post("/setSent/", (req, res) => (0, SaleOrder_1.setOrderSent)(req, res))
    .post("/updateQuantityOnSent/", (req, res) => (0, SaleOrder_1.updateQuantityOnSent)(req, res));
exports.default = supplierRouter;
