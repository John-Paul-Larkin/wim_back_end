"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrderSent = exports.setOrderPicked = exports.getSaleOrders = exports.getOrderPickedIds = exports.getOrderSentIds = exports.getOrderReceivedIds = exports.editSaleOrder = exports.updateQuantityOnSent = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const editSaleOrder = (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    const customerID = req.body.customerID;
    const products = req.body.products;
    const employeeID = req.body.employeeID;
    let queryString = `INSERT INTO sale_orders 
  (placed_date, status, ordered_by_employee, customer_id)
  VALUES (NOW(),"received",${employeeID},${customerID})`;
    let orderID;
    let error = null;
    dbConfig_1.default.query(queryString, (err, result) => {
        if (err) {
            error = err;
        }
        else {
            orderID = result.insertId;
            products.forEach((product) => {
                const productID = product.product_id;
                const orderQuantity = product.order_quantity;
                queryString = `INSERT INTO sale_orders_product
      (product_id, quantity, order_id)
      VALUES (${productID},${orderQuantity}, ${orderID});`;
                dbConfig_1.default.query(queryString, (err, result) => {
                    if (err) {
                        error = err;
                    }
                });
                const updateQuantityOnHoldQueryString = `
           UPDATE product
           SET quantity_on_hold = quantity_on_hold + ${orderQuantity}
           WHERE product_id = ${productID};
        `;
                dbConfig_1.default.query(updateQuantityOnHoldQueryString, (err, result) => {
                    if (err) {
                        error = err;
                        console.log(err);
                    }
                });
            });
        }
        if (error) {
            res.send(JSON.stringify(error));
        }
        else {
            res.send(JSON.stringify("no error"));
        }
    });
};
exports.editSaleOrder = editSaleOrder;
const getOrderReceivedIds = (req, res) => {
    dbConfig_1.default.query(`select order_id from sale_orders where status = "received";`, (err, result) => {
        const orderIds = result.map((order) => order.order_id);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(orderIds));
    });
};
exports.getOrderReceivedIds = getOrderReceivedIds;
const getOrderPickedIds = (req, res) => {
    dbConfig_1.default.query(`select order_id from sale_orders where status = "picked";`, (err, result) => {
        const orderIds = result.map((order) => order.order_id);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(orderIds));
    });
};
exports.getOrderPickedIds = getOrderPickedIds;
const getOrderSentIds = (req, res) => {
    dbConfig_1.default.query(`select order_id from sale_orders where status = "sent";`, (err, result) => {
        const orderIds = result.map((order) => order.order_id);
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(orderIds));
    });
};
exports.getOrderSentIds = getOrderSentIds;

const getSaleOrders = (req, res) => {
    const id = req.params.id;
    dbConfig_1.default.query(`
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
            `, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
    });
};
exports.getSaleOrders = getSaleOrders;
const setOrderPicked = (req, res) => {
    const id = req.params.id;
    dbConfig_1.default.query(`UPDATE sale_orders
    SET status = 'picked',
    picked_date = NOW()
    WHERE order_id = ${id};`, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
    });
};
exports.setOrderPicked = setOrderPicked;
const setOrderSent = (req, res) => {
    // const id = req.params.id;
    const id = req.body.id;
    dbConfig_1.default.query(`UPDATE sale_orders
    SET status = 'sent'
    WHERE order_id = ${id};`, (err, result) => {
        if (err) {
            console.log(err, "update to sent error");
        }
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.send(JSON.stringify(result));
    });
};
exports.setOrderSent = setOrderSent;
const updateQuantityOnSent = (req, res) => {
    const orderDetails = req.body.orderDetails;
    orderDetails.forEach((order) => {
        const productID = order.productId;
        const orderQuantity = order.quantity;
        const QueryString = `
    UPDATE product
    SET quantity_on_hold = quantity_on_hold - ${orderQuantity},
     quantity_in_stock = quantity_in_stock - ${orderQuantity}
    WHERE product_id = ${productID};
 `;
        dbConfig_1.default.query(QueryString, (err, result) => {
            if (err) {
                console.log(err);
            }
        });
    });
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.send(JSON.stringify("ok"));
};
exports.updateQuantityOnSent = updateQuantityOnSent;
