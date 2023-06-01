"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplier_1 = require("../controllers/supplier");
const supplierRouter = express_1.default.Router();
supplierRouter
    .get("/", (req, res) => (0, supplier_1.getAllSuppliers)(req, res))
    .post("/", (req, res) => (0, supplier_1.editSupplier)(req, res))
    .delete("/", (req, res) => (0, supplier_1.deleteSupplier)(req, res));
exports.default = supplierRouter;
