"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = require("../controllers/customer");
const customerRouter = express_1.default.Router();
customerRouter
    .get("/", (req, res) => (0, customer_1.getAllCustomers)(req, res))
    .post("/", (req, res) => (0, customer_1.editCustomer)(req, res))
    .delete("/", (req, res) => (0, customer_1.deleteCustomer)(req, res));
exports.default = customerRouter;
