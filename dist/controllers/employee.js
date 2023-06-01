"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.editEmployee = exports.getAllEmployees = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const getAllEmployees = (req, res) => {
    dbConfig_1.default.query("select * from employee;", (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
    });
};
exports.getAllEmployees = getAllEmployees;
const editEmployee = (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const name = req.body.name;
    const contact_phone = req.body.contact_phone;
    const address = req.body.address;
    const eircode = req.body.eircode;
    const email = req.body.email;
    // If there is an id with the request we update the relevant record
    // else we insert a new record
    if (req.body.employee_id !== undefined) {
        const employee_id = req.body.employee_id;
        const sql = `UPDATE employee
        SET name = ?,
            contact_phone = ?,
            address = ?,
            eircode = ?,
            email = ?
        WHERE employee_id = ?`;
        const values = [name, contact_phone, address, eircode, email, employee_id];
        dbConfig_1.default.query(sql, values, (err, result) => {
            res.send(JSON.stringify(result));
        });
    }
    else {
        const sql = `INSERT INTO employee 
                (name, contact_phone, address, eircode, email) 
                VALUES (?, ?, ?, ?, ?)`;
        const values = [name, contact_phone, address, eircode, email];
        dbConfig_1.default.query(sql, values, (err, result) => {
            res.send(JSON.stringify(result));
        });
    }
};
exports.editEmployee = editEmployee;
const deleteEmployee = (req, res) => {
    const idOfEmployeeToDelete = req.body.id;
    const sql = `DELETE FROM employee 
               WHERE employee_id = ?`;
    const values = [idOfEmployeeToDelete];
    dbConfig_1.default.query(sql, values, (err, result) => {
        res.send(JSON.stringify(result));
    });
};
exports.deleteEmployee = deleteEmployee;
