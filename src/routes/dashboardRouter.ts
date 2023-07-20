import express from "express";
import {
  getDetailsForGraph,
  getNumberOfPurchasesBetweenDates,
  getNumberOfSalesBetweenDates,
  getProductsBelowRestock,
  getPurchasesBetweenDates,
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
  .get("/getPurchasesBetweenDates/:timeInterval", (req, res) => getPurchasesBetweenDates(req, res))
  .get("/getNumberOfSalesBetweenDates/:timeInterval", (req, res) => getNumberOfSalesBetweenDates(req, res))
  .get("/getNumberOfPurchasesBetweenDates/:timeInterval", (req, res) => getNumberOfPurchasesBetweenDates(req, res))
  .get("/getDetailsForGraph/:numberOfDays", (req, res) => getDetailsForGraph(req, res));

export default dashboardRouter;
