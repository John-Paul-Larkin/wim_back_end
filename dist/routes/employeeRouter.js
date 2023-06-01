"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_1 = require("../controllers/employee");
const employeeRouter = express_1.default.Router();
employeeRouter
    .get("/", (req, res) => (0, employee_1.getAllEmployees)(req, res))
    .post("/", (req, res) => (0, employee_1.editEmployee)(req, res))
    .delete("/", (req, res) => (0, employee_1.deleteEmployee)(req, res));
exports.default = employeeRouter;
