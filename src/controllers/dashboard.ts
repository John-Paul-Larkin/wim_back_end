import { Request, Response } from "express";
import pool from "../config/dbConfig";

const getTotalPurchaseValueOfStock = (req: Request, res: Response) => {
  pool.query("SELECT SUM(quantity_in_stock * purchase_price) AS total_cost from product;", (err, result) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
    res.send(JSON.stringify(result));
  });
};

const getTotalSaleValueOfStock = (req: Request, res: Response) => {
  pool.query("SELECT SUM(quantity_in_stock * sale_price) AS total_sale from product;", (err, result) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
    res.send(JSON.stringify(result));
  });
};

const getProductsBelowRestock = (req: Request, res: Response) => {
  pool.query(
    `SELECT product.name, product.product_id, product.restock_level - product.quantity_in_stock AS shortage FROM product 
    WHERE product.quantity_in_stock < product.restock_level;
    `,
    (err, result) => {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
      res.send(JSON.stringify(result));
    }
  );
};

const getNumberOfPurchasesBetweenDates = (req: Request, res: Response) => {
  const timeInterval = req.params.timeInterval;

  if (timeInterval === "all-time") {
    pool.query(
      `SELECT COUNT(DISTINCT p.purchase_id) as count
      FROM purchase_orders AS po
      JOIN purchase_orders_product AS p
        ON po.purchase_id = p.purchase_id
      JOIN product AS pr
        ON p.product_id = pr.product_id;`,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);

        res.send(JSON.stringify(result));
      }
    );
  } else if (timeInterval === "today") {
    pool.query(
      `SELECT COUNT(DISTINCT p.purchase_id) as count
      FROM purchase_orders AS po
      JOIN purchase_orders_product AS p
        ON po.purchase_id = p.purchase_id
      JOIN product AS pr
        ON p.product_id = pr.product_id
        WHERE DATE(po.ordered_date) = CURDATE();
        `,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
        res.send(JSON.stringify(result));
      }
    );
  } else {
    const sql = `SELECT COUNT(DISTINCT p.purchase_id) as count
    FROM purchase_orders AS po
    JOIN purchase_orders_product AS p
      ON po.purchase_id = p.purchase_id
    JOIN product AS pr
      ON p.product_id = pr.product_id
  WHERE DATE(po.ordered_date) >= DATE_SUB(CURDATE(), INTERVAL 1 ${timeInterval})
    AND DATE(po.ordered_date) <= CURDATE();`;

    // const values = [timeInterval];
    // NB  had issues here inputting a string literal into a prepared statement
    pool.query(sql, (err, result) => {
      console.log(err);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
      res.send(JSON.stringify(result));
    });
  }
};

const getPurchasesBetweenDates = (req: Request, res: Response) => {
  const timeInterval = req.params.timeInterval;
  // time interval either week month or all-time
  if (timeInterval === "all-time") {
    pool.query(
      `SELECT SUM(p.quantity * pr.purchase_price) AS total_value
      FROM purchase_orders AS po
      JOIN purchase_orders_product AS p
        ON po.purchase_id = p.purchase_id
      JOIN product AS pr
        ON p.product_id = pr.product_id`,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
        res.send(JSON.stringify(result));
      }
    );
  } else if (timeInterval === "today") {
    pool.query(
      `SELECT SUM(p.quantity * pr.purchase_price) AS total_value
      FROM purchase_orders AS po
      JOIN purchase_orders_product AS p
        ON po.purchase_id = p.purchase_id
      JOIN product AS pr
        ON p.product_id = pr.product_id
        WHERE DATE(po.ordered_date) = CURDATE();
        `,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
        res.send(JSON.stringify(result));
      }
    );
  } else {
    const sql = `SELECT SUM(p.quantity * pr.purchase_price) AS total_value
    FROM purchase_orders AS po
    JOIN purchase_orders_product AS p
      ON po.purchase_id = p.purchase_id
    JOIN product AS pr
      ON p.product_id = pr.product_id
  WHERE DATE(po.ordered_date) >= DATE_SUB(CURDATE(), INTERVAL 1 ${timeInterval})
    AND DATE(po.ordered_date) <= CURDATE();`;

    // const values = [timeInterval];
    // NB  had issues here inputting a string literal into a prepared statement
    pool.query(sql, (err, result) => {
      // console.log(err);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
      res.send(JSON.stringify(result));
    });
  }
};

const getSalesBetweenDates = (req: Request, res: Response) => {
  const timeInterval = req.params.timeInterval;
  // time interval either week month or all-time
  if (timeInterval === "all-time") {
    pool.query(
      `SELECT SUM(p.quantity * pr.sale_price) AS total_value
      FROM sale_orders AS so
      JOIN sale_orders_product AS p
        ON so.order_id = p.order_id
      JOIN product AS pr
        ON p.product_id = pr.product_id`,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
        res.send(JSON.stringify(result));
      }
    );
  } else if (timeInterval === "today") {
    pool.query(
      `SELECT SUM(p.quantity * pr.sale_price) AS total_value
      FROM sale_orders AS so
      JOIN sale_orders_product AS p
        ON so.order_id = p.order_id
      JOIN product AS pr
        ON p.product_id = pr.product_id
        WHERE DATE(so.placed_date) = CURDATE();
        `,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
        res.send(JSON.stringify(result));
      }
    );
  } else {
    const sql = `SELECT SUM(p.quantity * pr.sale_price) AS total_value
  FROM sale_orders AS so
  JOIN sale_orders_product AS p
    ON so.order_id = p.order_id
  JOIN product AS pr
    ON p.product_id = pr.product_id
  WHERE DATE(so.placed_date) >= DATE_SUB(CURDATE(), INTERVAL 1 ${timeInterval})
    AND DATE(so.placed_date) <= CURDATE();`;

    // const values = [timeInterval];
    // NB  had issues here inputting a string literal into a prepared statement
    pool.query(sql, (err, result) => {
      console.log(err);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
      res.send(JSON.stringify(result));
    });
  }
};

const getNumberOfSalesBetweenDates = (req: Request, res: Response) => {
  const timeInterval = req.params.timeInterval;
  console.log(timeInterval, "ti");

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
        res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
        res.send(JSON.stringify(result));
      }
    );
  } else if (timeInterval === "today") {
    pool.query(
      `SELECT COUNT(DISTINCT p.order_id) as count
      FROM sale_orders AS so
      JOIN sale_orders_product AS p
        ON so.order_id = p.order_id
      JOIN product AS pr
        ON p.product_id = pr.product_id
        WHERE DATE(so.placed_date) = CURDATE();
        `,
      (err, result) => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
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
  WHERE DATE(so.placed_date) >= DATE_SUB(CURDATE(), INTERVAL 1 ${timeInterval})
    AND DATE(so.placed_date) <= CURDATE();`;

    // const values = [timeInterval];
    // NB  had issues here inputting a string literal into a prepared statement
    pool.query(sql, (err, result) => {
      // console.log(err);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);
      res.send(JSON.stringify(result));
    });
  }
};

const getDetailsForGraph = (req: Request, res: Response) => {
  const numberOfDays = req.params.numberOfDays;

  const sql = `SELECT 
COALESCE(sales_subquery.order_date,
        purchases_subquery.order_date) AS order_date,
sales,
purchases
FROM
(SELECT 
    DATE(so.placed_date) AS order_date,
        SUM(sop.quantity * pr.sale_price) AS sales
FROM
    sale_orders AS so
JOIN sale_orders_product AS sop ON so.order_id = sop.order_id
JOIN product AS pr ON sop.product_id = pr.product_id
WHERE
    DATE(so.placed_date) > DATE_SUB(CURDATE(), INTERVAL ${numberOfDays} DAY)
        AND DATE(so.placed_date) <= CURDATE() 
GROUP BY DATE(so.placed_date)) AS sales_subquery
    LEFT JOIN
(SELECT 
    DATE(po.ordered_date) AS order_date,
        SUM(pop.quantity * pr.purchase_price) AS purchases
FROM
    purchase_orders AS po
JOIN purchase_orders_product AS pop ON po.purchase_id = pop.purchase_id
JOIN product AS pr ON pop.product_id = pr.product_id
WHERE
    DATE(po.ordered_date) > DATE_SUB(CURDATE(), INTERVAL ${numberOfDays} DAY)
        AND DATE(po.ordered_date) <= CURDATE() 
GROUP BY DATE(po.ordered_date)) AS purchases_subquery ON sales_subquery.order_date = purchases_subquery.order_date 
UNION SELECT 
COALESCE(sales_subquery.order_date,
        purchases_subquery.order_date) AS order_date,
sales,
purchases
FROM
(SELECT 
    DATE(so.placed_date) AS order_date,
        SUM(sop.quantity * pr.sale_price) AS sales
FROM
    sale_orders AS so
JOIN sale_orders_product AS sop ON so.order_id = sop.order_id
JOIN product AS pr ON sop.product_id = pr.product_id
WHERE
    DATE(so.placed_date) > DATE_SUB(CURDATE(), INTERVAL ${numberOfDays} DAY)
        AND DATE(so.placed_date) <= CURDATE()
GROUP BY DATE(so.placed_date)) AS sales_subquery
    RIGHT JOIN
(SELECT 
    DATE(po.ordered_date) AS order_date,
        SUM(pop.quantity * pr.purchase_price) AS purchases
FROM
    purchase_orders AS po
JOIN purchase_orders_product AS pop ON po.purchase_id = pop.purchase_id
JOIN product AS pr ON pop.product_id = pr.product_id
WHERE
    DATE(po.ordered_date) > DATE_SUB(CURDATE(), INTERVAL ${numberOfDays} DAY)
        AND DATE(po.ordered_date) <= CURDATE() 
GROUP BY DATE(po.ordered_date)) AS purchases_subquery ON sales_subquery.order_date = purchases_subquery.order_date
WHERE
sales_subquery.order_date IS NULL
ORDER BY order_date DESC;
`;

  pool.query(sql, (err, result) => {
    // console.log(new Date().toString());
    // console.log(new Date().toString());
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_HOST!);

    res.send(JSON.stringify(result));
  });
};

export {
  getDetailsForGraph,
  getNumberOfPurchasesBetweenDates,
  getNumberOfSalesBetweenDates,
  getProductsBelowRestock,
  getPurchasesBetweenDates,
  getSalesBetweenDates,
  getTotalPurchaseValueOfStock,
  getTotalSaleValueOfStock,
};
