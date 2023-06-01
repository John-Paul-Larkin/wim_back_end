"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const productRouter = express_1.default.Router();
productRouter
    .get("/", (req, res) => (0, product_1.getAllProducts)(req, res))
    .post("/", (req, res) => (0, product_1.editProduct)(req, res))
    .delete("/", (req, res) => (0, product_1.deleteProduct)(req, res));
exports.default = productRouter;
