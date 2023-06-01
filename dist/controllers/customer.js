"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomer = exports.editCustomer = exports.getAllCustomers = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const getAllCustomers = (req, res) => {
    dbConfig_1.default.query("select * from customer;", (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
    });
};
exports.getAllCustomers = getAllCustomers;
const editCustomer = (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const name = req.body.name;
    const rep = req.body.rep;
    const contact_phone = req.body.contact_phone;
    const address = req.body.address;
    const eircode = req.body.eircode;
    const email = req.body.email;
    // If there is an id with the request we update the relevant record
    // else we insert a new record
    if (req.body.customer_id !== undefined) {
        const customer_id = req.body.customer_id;
        const sql = `UPDATE customer
    SET name = ?,
        rep = ?,
        contact_phone = ?,
        address = ?,
        eircode = ?,
        email = ?
    WHERE customer_id = ?`;
        const values = [name, rep, contact_phone, address, eircode, email, customer_id];
        dbConfig_1.default.query(sql, values, (err, result) => {
            res.send(JSON.stringify(result));
        });
    }
    else {
        const sql = `INSERT INTO customer 
                 (name, rep, contact_phone, address, eircode, email) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, rep, contact_phone, address, eircode, email];
        dbConfig_1.default.query(sql, values, (err, result) => {
            res.send(JSON.stringify(result));
        });
    }
};
exports.editCustomer = editCustomer;
const deleteCustomer = (req, res) => {
    const idOfCustomerToDelete = req.body.id;
    const sql = `DELETE FROM customer 
               WHERE customer_id = ?`;
    const values = [idOfCustomerToDelete];
    dbConfig_1.default.query(sql, values, (err, result) => {
        console.log(result);
        res.send(JSON.stringify(result));
    });
};
exports.deleteCustomer = deleteCustomer;
