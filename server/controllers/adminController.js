// Importing Required Modules
import sqlPool from "../database/dbConnection.js";

// Importing our custom middlewares
import { errorHandler } from "../middlewares/errorHandler.js";

// Creating and Exporting a Get Admins Controller Function
export const getAdmins = async (req, res, next) => {
    try {
        // Query to Fetch all Admins
        const getAdminsQuery = "SELECT * FROM Admins";

        // Using a Promise to handle asynchronous database operations
        const Admins = await new Promise((resolve, reject) => {
            sqlPool.query(
                getAdminsQuery, 
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
        res.status(200).json(Admins);
    } catch (error) {
        next(error);
    }
};

// Creating and Exporting a Add Admins Controller Function
export const addAdmin = async (req, res, next) => {
    try {
        const { Name } = req.body;

        // Query to insert new Admin into the database
        const addAdminQuery = `
            INSERT INTO Admins (Name)
            VALUES (?)
        `;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                addAdminQuery, 
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
        res.status(200).json({ message: "Admin added successfully!" });
    } catch (error) {
        next(error);
    }
};

// Creating and Exporting a Update Admins Controller Function
export const updateAdmin = async (req, res, next) => {
    try {
        const { Name } = req.body;
        const AdminID = req.params.AdminID;

        // Query to update Admin in the database
        const updateAdminQuery = `
            UPDATE Admins
            SET Name = ?
            WHERE AdminID = ?
        `;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                updateAdminQuery, 
                [Name, AdminID],
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
        res.status(200).json({ message: "Admin updated successfully!" });
    } catch (error) {
        next(error);
    }
};



// Creating and Exporting a Delete Admins Controller Function
export const deleteAdmin = async (req, res, next) => {
    try {
        const AdminID = req.params.AdminID;

        // Query to delete Admin from the database
        const deleteAdminQuery = `
            DELETE FROM Admins
            WHERE AdminID = ?
        `;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            sqlPool.query(
                deleteAdminQuery, 
                [AdminID],
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
        res.status(200).json({ message: "Admin deleted successfully!" });
    } catch (error) {
        next(error);
    }
};
