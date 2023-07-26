import { Request, Response } from "express";
import pool from "../config/dbConfig";

const getAllSuppliers = (req: Request, res: Response) => {
  pool.query("select * from supplier;", (err, result) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "true");
    res.send(JSON.stringify(result));
  });
};

const editSupplier = (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "true");

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

    pool.query(sql, values, (err, result) => {
      res.send(JSON.stringify(result));
    });
  } else {
    const sql = `INSERT INTO supplier 
    (name, rep, contact_phone, address, eircode, email) 
    VALUES (?, ?, ?, ?, ?, ?)`;

    const values = [name, rep, contact_phone, address, eircode, email];

    pool.query(sql, values, (err, result) => {
      res.send(JSON.stringify(result));
    });
  }
};

const deleteSupplier = (req: Request, res: Response) => {
  const idOfSupplierToDelete = req.body.id;

  const sql = `DELETE FROM supplier 
  WHERE supplier_id = ?`;

  const values = [idOfSupplierToDelete];

  pool.query(sql, values, (err, result) => {
    res.send(JSON.stringify(result));
  });
};

export { deleteSupplier, editSupplier, getAllSuppliers };
