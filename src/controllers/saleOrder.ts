import { Request, Response } from "express";

import pool from "../config/dbConfig";

import { ProductDataQuantity, SalesOrderDetails } from "../types/types";

const createSaleOrder = (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");

  const customerID = req.body.customerID;
  const products = req.body.products;
  const employeeID = req.body.employeeID;

  let queryString = `INSERT INTO sale_orders 
  (placed_date, status, ordered_by_employee, customer_id)
  VALUES (NOW(),"received",${employeeID},${customerID})`;

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

        queryString = `INSERT INTO sale_orders_product
      (product_id, quantity, order_id)
      VALUES (${productID},${orderQuantity}, ${orderID});`;

        pool.query(queryString, (err, result: any) => {
          if (err) {
            error = err;
          }
        });

        const updateQuantityOnHoldQueryString = `
           UPDATE product
           SET quantity_on_hold = quantity_on_hold + ${orderQuantity}
           WHERE product_id = ${productID};
        `;
        pool.query(updateQuantityOnHoldQueryString, (err, result: any) => {
          if (err) {
            error = err;
            console.log(err);
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

const getOrderReceivedIds = (req: Request, res: Response) => {
  pool.query(`select order_id from sale_orders where status = "received";`, (err, result: any) => {
    const orderIds = result.map((order: any) => order.order_id);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send(JSON.stringify(orderIds));
  });
};

const getOrderPickedIds = (req: Request, res: Response) => {
  pool.query(`select order_id from sale_orders where status = "picked";`, (err, result: any) => {
    const orderIds = result.map((order: any) => order.order_id);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send(JSON.stringify(orderIds));
  });
};

const getOrderSentIds = (req: Request, res: Response) => {
  pool.query(`select order_id from sale_orders where status = "sent";`, (err, result: any) => {
    const orderIds = result.map((order: any) => order.order_id);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send(JSON.stringify(orderIds));
  });
};

const getSaleOrder = (req: Request, res: Response) => {
  const id = req.params.id;

  pool.query(
    `
          select product.product_id AS productId, product.name AS productName, product.case_size AS caseSize, product.sold_by AS soldBy, sale_orders_product.quantity AS quantity, sale_orders.placed_date AS placedDate, sale_orders.picked_date AS pickedDate, customer.name AS businessName, employee.name AS employeeName 
            from product
            inner join sale_orders_product
            on product.product_id = sale_orders_product.product_id
            inner join sale_orders
            on sale_orders.order_id = sale_orders_product.order_id
            inner join employee
            on employee.employee_id = sale_orders.ordered_by_employee
            inner join customer
            on customer.customer_id = sale_orders.customer_id
            where sale_orders.order_id = ${id};
            `,
    (err, result: any) => {
      if (err) {
        console.log(err);
      }
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.send(JSON.stringify(result));
    }
  );
};

const setOrderPicked = (req: Request, res: Response) => {
  const id = req.params.id;

  pool.query(
    `UPDATE sale_orders
    SET status = 'picked',
    picked_date = NOW()
    WHERE order_id = ${id};`,

    (err, result: any) => {
      if (err) {
        console.log(err);
      }
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.send(JSON.stringify(result));
    }
  );
};

const setOrderSent = (req: Request, res: Response) => {
  const id = req.body.id;

  pool.query(
    `UPDATE sale_orders
    SET status = 'sent'
    WHERE order_id = ${id};`,

    (err, result: any) => {
      if (err) {
        console.log(err, "update to sent error");
      }
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.send(JSON.stringify(result));
    }
  );
};

const updateQuantityOnSent = (req: Request, res: Response) => {
  const orderDetails = req.body.orderDetails;

  orderDetails.forEach((order: SalesOrderDetails) => {
    const productID = order.productId;
    const orderQuantity = order.quantity;

    const QueryString = `
    UPDATE product
    SET quantity_on_hold = quantity_on_hold - ${orderQuantity},
     quantity_in_stock = quantity_in_stock - ${orderQuantity}
    WHERE product_id = ${productID};
 `;
    pool.query(QueryString, (err, result: any) => {
      if (err) {
        console.log(err);
      }
    });
  });

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send(JSON.stringify("ok"));
};

export {
  createSaleOrder,
  getOrderPickedIds,
  getOrderReceivedIds,
  getOrderSentIds,
  getSaleOrder,
  setOrderPicked,
  setOrderSent,
  updateQuantityOnSent,
};
