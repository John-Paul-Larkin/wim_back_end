import express from "express";
import { deleteEmployee, editEmployee, getAllEmployees } from "../controllers/employee";

const employeeRouter = express.Router();

employeeRouter
  .get("/", (req, res) => getAllEmployees(req, res))
  .post("/", (req, res) => editEmployee(req, res))
  .delete("/", (req, res) => deleteEmployee(req, res));

export default employeeRouter;
