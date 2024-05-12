// Importing Required Modules
import sqlPool from "../database/dbConnection.js";

// Importing our custom middlewares
import { errorHandler } from "../middlewares/errorHandler.js";

// Creating and Exporting a Get Orders Controller Function
export const getOrders = async (req, res, next) => {
    try {
        // Query to Fetch all Orders
        const getOrdersQuery = `
            SELECT 
                o.OrderID,
                o.TotalAmount,
                MAX(p.SellerID) AS SellerID,
                o.CustomerID,
                o.OrderDate,
                COUNT(oi.OrderItemID) AS TotalItems,
                MAX(s.DeliveryDate) AS DeliveryDate,
                MAX(s.ShippingStatus) AS ShippingStatus,
                MAX(pm.PaymentMethod) AS PaymentMethod
            FROM 
                Orders o
            INNER JOIN 
                OrderItems oi ON o.OrderID = oi.OrderID
            INNER JOIN 
                Products p ON oi.ProductID = p.ProductID
            LEFT JOIN 
                Shippings s ON o.OrderID = s.OrderID
            LEFT JOIN 
                Payments pm ON o.OrderID = pm.OrderID
            GROUP BY 
                o.OrderID, o.TotalAmount, o.CustomerID, o.OrderDate; `   

        // Using a Promise to handle asynchronous database operations
        const Orders = await new Promise((resolve, reject) => {
            sqlPool.query(
                getOrdersQuery, 
                (err, result, fields) => {
                    if (err) {
                        next(errorHandler(400, err.message));
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
        
        // Sending response
        res.status(200).json(Orders);
    } catch (error) {
        next(error);
    }
};



// Creating and Exporting a Add Orders Controller Function
export const addOrder = async (req, res, next) => {
    try {
        const { TotalAmount, CustomerID, OrderDate, OrderItems, Shipping, Payment } = req.body;

        // Insert order into Orders table
        const insertOrderQuery = `
            INSERT INTO Orders (TotalAmount, CustomerID, OrderDate)
            VALUES (?, ?, ?);
        `;
        const [orderInsertionResult] = await sqlPool.promise().query(insertOrderQuery, [TotalAmount, CustomerID, OrderDate]);
        const OrderID = orderInsertionResult.insertId;

        // Insert order items into OrderItems table
        if (OrderItems && OrderItems.length > 0) {
            const orderItemsValues = OrderItems.map(item => [OrderID, item.ProductID, item.Quantity, item.UnitPrice]);
            const insertOrderItemsQuery = `
                INSERT INTO OrderItems (OrderID, ProductID, Quantity, UnitPrice)
                VALUES ?;
            `;
            await sqlPool.promise().query(insertOrderItemsQuery, [orderItemsValues]);
        }

        // Insert shipping data into Shippings table
        if (Shipping) {
            const { ShippingStatus, DeliveryDate } = Shipping;
            const insertShippingQuery = `
                INSERT INTO Shippings (OrderID, ShippingStatus, DeliveryDate)
                VALUES (?, ?, ?);
            `;
            await sqlPool.promise().query(insertShippingQuery, [OrderID, ShippingStatus, DeliveryDate]);
        }

        // Insert payment data into Payments table
        if (Payment) {
            const { Amount, PaymentMethod, PaymentDate } = Payment;
            const insertPaymentQuery = `
                INSERT INTO Payments (OrderID, Amount, PaymentMethod, PaymentDate)
                VALUES (?, ?, ?, ?);
            `;
            await sqlPool.promise().query(insertPaymentQuery, [OrderID, Amount, PaymentMethod, PaymentDate]);
        }

        // Sending success response
        res.status(200).json({ message: 'Order added successfully' });
    } catch (error) {
        next(error);
    }
};






// Creating and Exporting an Update Order Controller Function
export const updateOrder = async (req, res, next) => {
    try {
        // Extracting necessary data from the request body
        const { TotalAmount, CustomerID, OrderDate } = req.body;
        const { OrderID } = req.params;

        // Updating the order in the Orders table
        const updateOrderQuery = `
            UPDATE Orders
            SET TotalAmount = ?, CustomerID = ?, OrderDate = ?
            WHERE OrderID = ?;
        `;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                updateOrderQuery,
                [TotalAmount, CustomerID, OrderDate, OrderID],
                async (err, result, fields) => {
                    if (err) {
                        next(errorHandler(400, err.message));
                        reject(err);
                    } else {
                        // Update related tables
                        try {
                            await updateRelatedTables(OrderID, req.body);
                            resolve();
                        } catch (err) {
                            next(err);
                            reject(err);
                        }
                    }
                }
            );
        });

        // Sending success response
        res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
        next(error);
    }
};

// Function to update related data with given Order ID in other tables
const updateRelatedTables = async (OrderID, orderData) => {
    // Updating the Shippings table if necessary
    if (orderData.ShippingStatus || orderData.DeliveryDate) {
        const updateShippingQuery = `
            UPDATE Shippings
            SET ShippingStatus = ?, DeliveryDate = ?
            WHERE OrderID = ?;
        `;
        await new Promise((resolve, reject) => {
            sqlPool.query(
                updateShippingQuery,
                [orderData.ShippingStatus, orderData.DeliveryDate, OrderID],
                (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    // Updating the Payments table if necessary
    if (orderData.PaymentMethod) {
        const updatePaymentQuery = `
            UPDATE Payments
            SET PaymentMethod = ?
            WHERE OrderID = ?;
        `;
        await new Promise((resolve, reject) => {
            sqlPool.query(
                updatePaymentQuery,
                [orderData.PaymentMethod, OrderID],
                (err, result, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    // Add other related tables updates here if needed
}


// Creating and Exporting a Delete Orders Controller Function
export const deleteOrder = async (req, res, next) => {
    try {
        const { OrderID } = req.params;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            // Delete related order items and payments first
            Promise.all([
                deleteshipments(OrderID),
                deletePayments(OrderID),
                deleteOrderItems(OrderID),
            ])
                .then(() => {
                    // Then delete the order from Orders table
                    const deleteOrderQuery = `
                        DELETE FROM Orders
                        WHERE OrderID = ?;
                    `;
                    sqlPool.query(
                        deleteOrderQuery,
                        [OrderID],
                        (err, result, fields) => {
                            if (err) {
                                next(errorHandler(400, err.message));
                                reject(err);
                            } else {
                                resolve();
                            }
                        }
                    );
                })
                .catch(err => {
                    next(err);
                    reject(err);
                });
        });

        // Sending success response
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// Function to delete order items associated with the given OrderID
const deleteOrderItems = async (OrderID) => {
    const deleteOrderItemsQuery = `
        DELETE FROM OrderItems
        WHERE OrderID = ?;
    `;
    return new Promise((resolve, reject) => {
        sqlPool.query(
            deleteOrderItemsQuery,
            [OrderID],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

// Function to delete payments associated with the given OrderID
const deletePayments = async (OrderID) => {
    const deletePaymentsQuery = `
        DELETE FROM Payments
        WHERE OrderID = ?;
    `;
    return new Promise((resolve, reject) => {
        sqlPool.query(
            deletePaymentsQuery,
            [OrderID],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

// Function to delete shipments associated with the given OrderID
const deleteshipments = async (OrderID) => {
    const deletePaymentsQuery = `
        DELETE FROM Shippings
        WHERE OrderID = ?;
    `;
    return new Promise((resolve, reject) => {
        sqlPool.query(
            deletePaymentsQuery,
            [OrderID],
            (err, result, fields) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
};

