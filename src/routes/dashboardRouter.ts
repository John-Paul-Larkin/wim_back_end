import express from "express";
import {
  getDetailsForGraph,
  getNumberOfSalesBetweenDates,
  getProductsBelowRestock,
  getSalesBetweenDates,
  getTotalPurchaseValueOfStock,
  getTotalSaleValueOfStock,
} from "../controllers/dashboard";

const dashboardRouter = express.Router();

dashboardRouter
  .get("/getTotalPurchaseValueOfStock", (req, res) => getTotalPurchaseValueOfStock(req, res))
  .get("/getTotalSaleValueOfStock", (req, res) => getTotalSaleValueOfStock(req, res))
  .get("/getProductsBelowRestock", (req, res) => getProductsBelowRestock(req, res))
  .get("/getSalesBetweenDates/:timeInterval", (req, res) => getSalesBetweenDates(req, res))
  .get("/getNumberOfSalesBetweenDates/:timeInterval", (req, res) => getNumberOfSalesBetweenDates(req, res))
  .get("/getDetailsForGraph/:numberOfDays", (req, res) => getDetailsForGraph(req, res));

export default dashboardRouter;
