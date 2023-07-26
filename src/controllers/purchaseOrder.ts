import { Request, Response } from "express";
import pool from "../config/dbConfig";
import { ProductDataQuantity, PurchaseOrderDetails } from "../types/types";

const createPurchaseOrder = (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const supplierID = req.body.supplierID;
  const products = req.body.products;
  const employeeID = req.body.employeeID;

  let queryString = `INSERT INTO purchase_orders 
  (ordered_date, status, ordered_by_employee, supplier_id)
  VALUES (NOW(),"ordered",${employeeID},${supplierID})`;

  let orderID: number;
  let error: any = null;

  pool.query(queryString, (err, result: any) => {
    if (err) {
      error = err;
    } else {
      orderID = result.insertId;

      products.forEach((product: ProductDataQuantity) => {
        const productID = product.product_id;
        const orderQuantity = product.order_quantity;

        queryString = `INSERT INTO purchase_orders_product
      (product_id, quantity, purchase_id)
      VALUES (${productID},${orderQuantity}, ${orderID});`;

        pool.query(queryString, (err, result: any) => {
          if (err) {
            error = err;
          }
        });
      });
    }
    if (error) {
      res.send(JSON.stringify(error));
    } else {
      res.send(JSON.stringify("no error"));
    }
  });
};

const getOrderedIds = (req: Request, res: Response) => {
  pool.query(`select purchase_id from purchase_orders where status = "ordered";`, (err, result: any) => {
    const orderIds = result.map((order: any) => order.purchase_id);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(orderIds));
  });
};

const getReceivedIds = (req: Request, res: Response) => {
  pool.query(
    `select purchase_id from purchase_orders where status = "received" 
  ORDER BY received_date;`,
    (err, result: any) => {
      const orderIds = result.map((order: any) => order.purchase_id);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(JSON.stringify(orderIds));
    }
  );
};

const getPurchaseOrder = (req: Request, res: Response) => {
  const id = req.params.id;

  pool.query(
    `
      select product.product_id AS productId, product.name AS productName, product.case_size AS caseSize, product.sold_by AS soldBy, purchase_orders_product.quantity AS quantity, purchase_orders.received_date AS receivedDate, purchase_orders.ordered_date AS orderedDate, supplier.name AS supplierName, employee.name AS employeeName 
      from product
      inner join purchase_orders_product
      on product.product_id = purchase_orders_product.product_id
      inner join purchase_orders
      on purchase_orders.purchase_id = purchase_orders_product.purchase_id
      inner join employee
      on employee.employee_id = purchase_orders.ordered_by_employee
      inner join supplier
      on supplier.supplier_id = purchase_orders.supplier_id
      where purchase_orders.purchase_id = ${id};
              `,
    (err, result: any) => {
      if (err) {
        console.log(err);
      }
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(JSON.stringify(result));
    }
  );
};

const setOrderReceived = (req: Request, res: Response) => {
  const id = req.body.id;

  pool.query(
    `UPDATE purchase_orders
      SET status = 'received',
      received_date = NOW()
      WHERE purchase_id = ${id};`,

    (err, result: any) => {
      if (err) {
        console.log(err, "update to received error");
      }
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(JSON.stringify(result));
    }
  );
};

const updateQuantityOnReceived = (req: Request, res: Response) => {
  const orderDetails = req.body.orderDetails;

  orderDetails.forEach((order: PurchaseOrderDetails) => {
    const productID = order.productId;
    const orderQuantity = order.quantity;

    const QueryString = `
    UPDATE product
    SET
     quantity_in_stock = quantity_in_stock + ${orderQuantity}
    WHERE product_id = ${productID};
 `;
    pool.query(QueryString, (err, result: any) => {
      if (err) {
        console.log(err);
      }
    });
  });

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(JSON.stringify("ok"));
};

export { createPurchaseOrder, getOrderedIds, getPurchaseOrder, getReceivedIds, setOrderReceived, updateQuantityOnReceived };
