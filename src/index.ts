import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

import customerRouter from "./routes/customerRouter";
import dashboardRouter from "./routes/dashboardRouter";
import employeeRouter from "./routes/employeeRouter";
import productRouter from "./routes/productRouter";
import purchaseOrderRouter from "./routes/purchaseOrderRouter";
import saleOrderRouter from "./routes/saleOrderRouter";
import supplierRouter from "./routes/supplierRouter";

dotenv.config();
const app: Express = express();

const corsOptions = {
  origin: process.env.CORS_HOST,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

app.listen(process.env.PORT, () => console.log("listening on port", process.env.PORT));

app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/supplier", supplierRouter);
app.use("/employee", employeeRouter);
app.use("/saleOrder", saleOrderRouter);
app.use("/purchaseOrder", purchaseOrderRouter);
app.use("/dashboard", dashboardRouter);

app.get("*", (req, res) => {
  res.send("404 Not found!");
});
