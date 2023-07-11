import { Request, Response } from "express";
import pool from "../config/dbConfig";

const getTotalPurchaseValueOfStock = (req: Request, res: Response) => {
  pool.query("SELECT SUM(quantity_in_stock * purchase_price) AS total_cost from product;", (err, result) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send(JSON.stringify(result));
  });
};

const getTotalSaleValueOfStock = (req: Request, res: Response) => {
  pool.query("SELECT SUM(quantity_in_stock * sale_price) AS total_sale from product;", (err, result) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send(JSON.stringify(result));
  });
};

const getProductsBelowRestock = (req: Request, res: Response) => {
  pool.query(
    `SELECT product.name, product.product_id FROM product 
    WHERE product.quantity_in_stock < product.restock_level;
    `,
    (err, result) => {
      // console.log(result)

      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.send(JSON.stringify(result));
    }
  );
};

const getSalesBetweenDates = (req: Request, res: Response) => {
  const timeInterval = req.params.timeInterval;

  console.log(timeInterval);
  console.log(typeof timeInterval);

  if (timeInterval === "all-time") {
    pool.query(
      `SELECT SUM(p.quantity * pr.purchase_price) AS total_value
      FROM sale_orders AS so
      JOIN sale_orders_product AS p
        ON so.order_id = p.order_id
      JOIN product AS pr
        ON p.product_id = pr.product_id`,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
      }
    );
  } else {
    const sql = `SELECT SUM(p.quantity * pr.purchase_price) AS total_value
  FROM sale_orders AS so
  JOIN sale_orders_product AS p
    ON so.order_id = p.order_id
  JOIN product AS pr
    ON p.product_id = pr.product_id
  WHERE so.placed_date >= DATE_SUB(CURDATE(), INTERVAL 1 ${timeInterval})
    AND so.placed_date < CURDATE();`;

    // const values = [timeInterval];
    // NB  had issues here inputting a string literal into a prepared statement
    pool.query(sql, (err, result) => {
      console.log(err);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.send(JSON.stringify(result));
    });
  }
};

const getNumberOfSalesBetweenDates = (req: Request, res: Response) => {
  const timeInterval = req.params.timeInterval;

  console.log(timeInterval);
  console.log(typeof timeInterval);

  if (timeInterval === "all-time") {
    pool.query(
      `SELECT COUNT(DISTINCT p.order_id) as count
      FROM sale_orders AS so
      JOIN sale_orders_product AS p
        ON so.order_id = p.order_id
      JOIN product AS pr
        ON p.product_id = pr.product_id`,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
      }
    );
  } else {
    const sql = `SELECT COUNT(DISTINCT p.order_id) as count
  FROM sale_orders AS so
  JOIN sale_orders_product AS p
    ON so.order_id = p.order_id
  JOIN product AS pr
    ON p.product_id = pr.product_id
  WHERE so.placed_date >= DATE_SUB(CURDATE(), INTERVAL 1 ${timeInterval})
    AND so.placed_date < CURDATE();`;

    // const values = [timeInterval];
    // NB  had issues here inputting a string literal into a prepared statement
    pool.query(sql, (err, result) => {
      console.log(err);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.send(JSON.stringify(result));
    });
  }
};

export { getNumberOfSalesBetweenDates, getProductsBelowRestock, getSalesBetweenDates, getTotalPurchaseValueOfStock, getTotalSaleValueOfStock };
