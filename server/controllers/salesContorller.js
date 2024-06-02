// Importing Required Modules
import sqlPool from "../database/dbConnection.js";

// Importing our custom middlewares
import { errorHandler } from "../middlewares/errorHandler.js";

// Creating and Exporting a Get YearlySales Controller Function
export const getYearlySales = async (req, res, next) => {
    try {
        // Query to Fetch all Yearly Sales data
        const getYearlySalesQuery = `
            SELECT YEAR(o.OrderDate) AS Year, SUM(oi.Quantity * oi.UnitPrice) AS TotalSalesAmount
            FROM Orders o
            JOIN OrderItems oi ON o.OrderID = oi.OrderID
            GROUP BY YEAR(o.OrderDate)
            ORDER BY YEAR(o.OrderDate);
        `;

        // Using a Promise to handle asynchronous database operationsn
        const YearlySales = await new Promise((resolve, reject) => {
            sqlPool.query(
                getYearlySalesQuery, 
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
        res.status(200).json(YearlySales);
    } catch (error) {
        next(error);
    }
};


// Creating and Exporting a Get MonthlySales Controller Function
export const getMothlySales = async (req, res, next) => {
    try {
        // Query to Fetch all Monthly Sales data
        const getMonthlySalesQuery = `
        SELECT YEAR(OrderDate) AS Year, MONTH(OrderDate) AS Month, SUM(TotalAmount) AS TotalSalesAmount
        FROM Orders
        GROUP BY YEAR(OrderDate), MONTH(OrderDate)
        ORDER BY Year, Month;
        `;

        // Using a Promise to handle asynchronous database operationsn
        const MonthlySales = await new Promise((resolve, reject) => {
            sqlPool.query(
                getMonthlySalesQuery, 
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
        res.status(200).json(MonthlySales);
    } catch (error) {
        next(error);
    }
};


// Creating and Exporting a Get DailySales Controller Function
export const getDailySales = async (req, res, next) => {
    try {
        // Query to Fetch all Daily Sales data
        const getDailySalesQuery = `
            SELECT DATE(OrderDate) AS OrderDate, TotalAmount AS TotalSalesAmount
            FROM Orders;
        `;

        // Using a Promise to handle asynchronous database operationsn
        const DailySales = await new Promise((resolve, reject) => {
            sqlPool.query(
                getDailySalesQuery, 
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
        res.status(200).json(DailySales);
    } catch (error) {
        next(error);
    }
};


// Creating and Exporting a Get CategorySales Controller Function
export const getCategorySales = async (req, res, next) => {
    try {
        // Query to Fetch all Category Sales data
        const getCategorySalesQuery = `
            SELECT c.Name AS CategoryName, SUM(oi.Quantity * oi.UnitPrice) AS TotalSalesAmount
            FROM Orders o
            JOIN OrderItems oi ON o.OrderID = oi.OrderID
            JOIN Products p ON oi.ProductID = p.ProductID
            JOIN Categories c ON p.CategoryID = c.CategoryID
            GROUP BY c.Name;
        `;

        // Using a Promise to handle asynchronous database operationsn
        const CategorySales = await new Promise((resolve, reject) => {
            sqlPool.query(
                getCategorySalesQuery, 
                (err, result, fields) => {
                    if (err) {n
                        next(errorHandler(400, err.message));
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
        
        // Sending response
        res.status(200).json(CategorySales);
    } catch (error) {
        next(error);
    }
};