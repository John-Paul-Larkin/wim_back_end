"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.editProduct = exports.getAllProducts = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const getAllProducts = (req, res) => {
    dbConfig_1.default.query("select * from product;", (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
    });
};
exports.getAllProducts = getAllProducts;
const editProduct = (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const name = req.body.name;
    const description = req.body.description;
    const quantity_in_stock = req.body.quantity_in_stock;
    const sold_by = req.body.sold_by;
    const case_size = req.body.case_size;
    const unit_rrp = req.body.unit_rrp;
    const restock_level = req.body.restock_level;
    const sku = req.body.sku;
    const purchase_price = req.body.purchase_price;
    const sale_price = req.body.sale_price;
    // If there is an id with the request we update the relevant record
    // else we insert a new record
    if (req.body.product_id !== undefined) {
        const product_id = Number(req.body.product_id);
        const sql = `UPDATE product
    SET name = ?,
        description = ?,
        quantity_in_stock = ?,
        sold_by = ?,
        case_size = ?,
        unit_rrp = ?,
        restock_level = ?,
        sku = ?,
        purchase_price = ?,
        sale_price = ?
    WHERE product_id = ?`;
        const values = [name, description, quantity_in_stock, sold_by, case_size, unit_rrp, restock_level, sku, purchase_price, sale_price, product_id];
        dbConfig_1.default.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                res.send(JSON.stringify(err));
            }
            else {
                res.send(JSON.stringify(result));
            }
        });
    }
    else {
        const sql = `INSERT INTO product 
  (name, description, quantity_in_stock, sold_by, case_size, unit_rrp, restock_level, sku, purchase_price, sale_price) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [name, description, quantity_in_stock, sold_by, case_size, unit_rrp, restock_level, sku, purchase_price, sale_price];
        dbConfig_1.default.query(sql, values, (err, result) => {
            if (err) {
                res.send(JSON.stringify(err));
            }
            else {
                res.send(JSON.stringify(result));
            }
        });
    }
};
exports.editProduct = editProduct;
const deleteProduct = (req, res) => {
    const idOfProductToDelete = req.body.id;
    const sql = `DELETE FROM product 
  WHERE product_id = ?`;
    const values = [idOfProductToDelete];
    dbConfig_1.default.query(sql, values, (err, result) => {
        if (err) {
            res.send(JSON.stringify(err));
        }
        else {
            res.send(JSON.stringify(result));
        }
    });
};
exports.deleteProduct = deleteProduct;
