"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const customerRouter_1 = __importDefault(require("./routes/customerRouter"));
const employeeRouter_1 = __importDefault(require("./routes/employeeRouter"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const saleOrderRouter_1 = __importDefault(require("./routes/saleOrderRouter"));
const supplierRouter_1 = __importDefault(require("./routes/supplierRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.CORS_HOST,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.listen(process.env.PORT, () => console.log("listening"));
app.use("/customer", customerRouter_1.default);
app.use("/product", productRouter_1.default);
app.use("/supplier", supplierRouter_1.default);
app.use("/employee", employeeRouter_1.default);
app.use("/saleOrder", saleOrderRouter_1.default);
app.get("*", (req, res) => {
    res.send("404 Not found");
});
