// Importing Required Modules
import sqlPool from "../database/dbConnection.js";

// Importing our custom middlewares
import { errorHandler } from "../middlewares/errorHandler.js";

// Creating and Exporting a getCustomers Controller Function
export const getCustomers = async (req, res, next) => {
    try {

        // Query to add a new customer
        const getCustomersQuery = "SELECT CustomerID, Username, Email, Phone, Address, City, State, Country FROM Customers ORDER BY createdAt DESC";

        // Using a Promise to handle asynchronous database operations
        const customers = await new Promise((resolve, reject) => {
            sqlPool.query(
                getCustomersQuery, 
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
        res.status(200).json(customers);
    } catch (error) {
        next(error);
    }
};


// Creating and Exporting an addCustomers Controller Function
export const addCustomer = async (req, res, next) => {
    try {
        // Extracting customer data from request body
        const { Username, Password, Email, Phone, Address, City, State, Country } = req.body;

        // Query to add a new customer
        const addNewCustomerQuery = "INSERT INTO Customers (Username, Password, Email, Phone, Address, City, State, Country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        // Using a Promise to handle asynchronous database operations
        const newCustomer = await new Promise((resolve, reject) => {
            // Inserting new user into the Users table using parameterized query
            sqlPool.query(
                addNewCustomerQuery,
                [Username, Password, Email, Phone, Address, City, State, Country],
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
        res.status(201).json("Customer added successfully!");
    } catch (error) {
        next(error);
    }
};


// Creating and Exporting an updateCustomer controller fucntion
export const updateCustomer = async (req, res, next) => {
    try {
        // Extracting updated customer data from request body
        const { Username, Password, Email, Phone, Address, City, State, Country } = req.body;
        const customerId = req.params.CustomerID; // Extracting CustomerID from URL parameter

        // Query to update an existing customer
        const updateCustomerQuery = `
            UPDATE Customers 
            SET 
                Username = ?, 
                Password = ?, 
                Email = ?, 
                Phone = ?, 
                Address = ?, 
                City = ?, 
                State = ?, 
                Country = ? 
            WHERE 
                CustomerID = ?
        `;

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            // Updating the customer in the database using parameterized query
            sqlPool.query(
                updateCustomerQuery,
                [Username, Password, Email, Phone, Address, City, State, Country, customerId],
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
        res.status(200).json("Customer updated successfully!");
    } catch (error) {
        next(error);
    }
};

// Creating and Exporting a deleteCustomer controller function
export const deleteCustomer = async (req, res, next) => {
    try {
        // Extracting CustomerID from URL parameter
        const customerId = req.params.CustomerID;

        // Query to delete the customer record
        const deleteCustomerQuery = "DELETE FROM Customers WHERE CustomerID = ?";

        // Using a Promise to handle asynchronous database operations
        await new Promise((resolve, reject) => {
            // Deleting the customer from the database using parameterized query
            sqlPool.query(
                deleteCustomerQuery,
                [customerId],
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
        res.status(200).json("Customer deleted successfully!");
    } catch (error) {
        next(error);
    }
};