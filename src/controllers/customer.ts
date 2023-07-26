import { Request, Response } from "express";
import pool from "../config/dbConfig";

const getAllCustomers = (req: Request, res: Response) => {
  pool.query("select * from customer;", (err, result) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.send(JSON.stringify(result));
  });
};

const editCustomer = (req: Request, res: Response) => {
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

    pool.query(sql, values, (err, result) => {
      res.send(JSON.stringify(result));
    });
  } else {
    const sql = `INSERT INTO customer 
                 (name, rep, contact_phone, address, eircode, email) 
                 VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [name, rep, contact_phone, address, eircode, email];

    pool.query(sql, values, (err, result) => {
      res.send(JSON.stringify(result));
    });
  }
};

const deleteCustomer = (req: Request, res: Response) => {
  const idOfCustomerToDelete = req.body.id;
  const sql = `DELETE FROM customer 
               WHERE customer_id = ?`;
  const values = [idOfCustomerToDelete];
  pool.query(sql, values, (err, result) => {
    res.send(JSON.stringify(result));
  });
};

export { deleteCustomer, editCustomer, getAllCustomers };
