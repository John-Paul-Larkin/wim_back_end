"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSupplier = exports.editSupplier = exports.getAllSuppliers = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const getAllSuppliers = (req, res) => {
    dbConfig_1.default.query("select * from supplier;", (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
    });
};
exports.getAllSuppliers = getAllSuppliers;
const editSupplier = (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const name = req.body.name;
    const rep = req.body.rep;
    const contact_phone = req.body.contact_phone;
    const address = req.body.address;
    const eircode = req.body.eircode;
    const email = req.body.email;
    // If there is an id with the request we update the relevant record
    // else we insert a new record
    if (req.body.supplier_id !== undefined) {
        const supplier_id = req.body.supplier_id;
        const sql = `UPDATE supplier
    SET name = ?,
        rep = ?,
        contact_phone = ?,
        address = ?,
        eircode = ?,
        email = ?
    WHERE supplier_id = ?`;
        const values = [name, rep, contact_phone, address, eircode, email, supplier_id];
        dbConfig_1.default.query(sql, values, (err, result) => {
            res.send(JSON.stringify(result));
        });
    }
    else {
        const sql = `INSERT INTO supplier 
    (name, rep, contact_phone, address, eircode, email) 
    VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [name, rep, contact_phone, address, eircode, email];
        dbConfig_1.default.query(sql, values, (err, result) => {
            res.send(JSON.stringify(result));
        });
    }
};
exports.editSupplier = editSupplier;
const deleteSupplier = (req, res) => {
    const idOfSupplierToDelete = req.body.id;
    const sql = `DELETE FROM supplier 
  WHERE supplier_id = ?`;
    const values = [idOfSupplierToDelete];
    dbConfig_1.default.query(sql, values, (err, result) => {
        res.send(JSON.stringify(result));
    });
};
exports.deleteSupplier = deleteSupplier;
