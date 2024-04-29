// Importing Required Modules
import sqlPool from "../database/dbConnection.js";

// Importing our custom middlewares
import { errorHandler } from "../middlewares/errorHandler.js";

// Creating and Exporting a Get Products Controller Function
export const getProducts = async (req, res, next) => {
    try {
        // Query to Fetch all Products
        const getProductsQuery = "SELECT * FROM Products";

        // Using a Promise to handle asynchronous database operations
        const products = await new Promise((resolve, reject) => {
            sqlPool.query(
                getProductsQuery, 
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
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Creating and Exporting a Add Products Controller Function
export const addProduct = async (req, res, next) => {
    try {
        // Extracting data from request body
        const { CategoryID, SellerID, Name, Description, Price, StockQuantity } = req.body;

        // Query to insert product into the database
        const addProductQuery = `
            INSERT INTO Products (CategoryID, SellerID, Name, Description, Price, StockQuantity)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                addProductQuery, 
                [CategoryID, SellerID, Name, Description, Price, StockQuantity],
                (err, result) => {
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
        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        next(error);
    }
};



// Creating and Exporting a Update Products Controller Function
export const updateProduct = async (req, res, next) => {
    try {
        // Extracting updated product data from request body
        const { CategoryID, SellerID, Name, Description, Price, StockQuantity } = req.body;
        const ProductID = req.params.ProductID;

        // Query to update product in the database
        const updateProductQuery = `
            UPDATE Products
            SET CategoryID = ?, SellerID = ?, Name = ?, Description = ?, Price = ?, StockQuantity = ?
            WHERE ProductID = ?
        `;
        
        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                updateProductQuery, 
                [CategoryID, SellerID, Name, Description, Price, StockQuantity, ProductID],
                (err, result) => {
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
        res.status(200).json({ message: "Product updated successfully!" });
    } catch (error) {
        next(error);
    }
};



// Creating and Exporting a Delete Products Controller Function (there is some dependency in other tables where deleting might get some error...)
export const deleteProduct = async (req, res, next) => {
    try {
        // Extracting ProductID from request parameters
        const ProductID = req.params.ProductID;

        // Query to delete product from the database
        const deleteProductQuery = `
            DELETE FROM Products
            WHERE ProductID = ?
        `;
        
        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                deleteProductQuery, 
                [ProductID],
                (err, result) => {
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
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        next(error);
    }
};
