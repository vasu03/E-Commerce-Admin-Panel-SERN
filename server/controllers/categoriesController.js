// Importing Required Modules
import sqlPool from "../database/dbConnection.js";

// Importing our custom middlewares
import { errorHandler } from "../middlewares/errorHandler.js";

// Creating and Exporting a Get Categories Controller Function
export const getCategories = async (req, res, next) => {
    try {
        // Query to Fetch all Categories
        const getCategoriesQuery = "SELECT * FROM Categories";

        // Using a Promise to handle asynchronous database operations
        const Categories = await new Promise((resolve, reject) => {
            sqlPool.query(
                getCategoriesQuery, 
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
        res.status(200).json(Categories);
    } catch (error) {
        next(error);
    }
};

// Creating and Exporting a Add Categories Controller Function
export const addCategory = async (req, res, next) => {
    try {
        const { Name } = req.body;

        // Query to insert new category into the database
        const addCategoryQuery = `
            INSERT INTO Categories (Name)
            VALUES (?)
        `;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                addCategoryQuery, 
                [Name],
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
        res.status(200).json({ message: "Category added successfully!" });
    } catch (error) {
        next(error);
    }
};

// Creating and Exporting a Update Categories Controller Function
export const updateCategory = async (req, res, next) => {
    try {
        const { Name } = req.body;
        const CategoryID = req.params.CategoryID;

        // Query to update category in the database
        const updateCategoryQuery = `
            UPDATE Categories
            SET Name = ?
            WHERE CategoryID = ?
        `;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                updateCategoryQuery, 
                [Name, CategoryID],
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
        res.status(200).json({ message: "Category updated successfully!" });
    } catch (error) {
        next(error);
    }
};



// Creating and Exporting a Delete Categories Controller Function
export const deleteCategory = async (req, res, next) => {
    try {
        const CategoryID = req.params.CategoryID;

        // Query to delete category from the database
        const deleteCategoryQuery = `
            DELETE FROM Categories
            WHERE CategoryID = ?
        `;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                deleteCategoryQuery, 
                [CategoryID],
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
        res.status(200).json({ message: "Category deleted successfully!" });
    } catch (error) {
        next(error);
    }
};
