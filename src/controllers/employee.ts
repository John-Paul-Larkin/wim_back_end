import { Request, Response } from "express";
import pool from "../config/dbConfig";

const getAllEmployees = (req: Request, res: Response) => {
  pool.query("select * from employee;", (err, result) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
    res.send(JSON.stringify(result));
  });
};

const editEmployee = (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);

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

    pool.query(sql, values, (err, result) => {
      res.send(JSON.stringify(result));
    });
  } else {
    const sql = `INSERT INTO employee 
                (name, contact_phone, address, eircode, email) 
                VALUES (?, ?, ?, ?, ?)`;
    const values = [name, contact_phone, address, eircode, email];

    pool.query(sql, values, (err, result) => {
      res.send(JSON.stringify(result));
    });
  }
};

const deleteEmployee = (req: Request, res: Response) => {
  const idOfEmployeeToDelete = req.body.id;

  const sql = `DELETE FROM employee 
               WHERE employee_id = ?`;
  const values = [idOfEmployeeToDelete];
  pool.query(sql, values, (err, result) => {
    res.send(JSON.stringify(result));
  });
};

export { deleteEmployee, editEmployee, getAllEmployees };
