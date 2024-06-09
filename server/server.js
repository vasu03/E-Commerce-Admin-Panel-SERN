// Importing the required modules
import express from "express";
import sqlPool from "./database/dbConnection.js";

// Importing our custom Routes
import customerRoutes from "./routes/customerRoute.js";
import productRoutes from "./routes/productRoute.js";
import ordersRoutes from "./routes/orderRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import salesRoutes from "./routes/salesRoutes.js";
import adminRoutes from "./routes/adminRoute.js";

// Creating our Express App
const app = express();

// Setting up the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));        // Middleware to parse URL-encoded bodies

// Setting up our custom Routes
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/admins", adminRoutes);

// Attempt to establish a connection to the database
sqlPool.getConnection((err, connection) => {
    if (err) {
        console.log("Error connecting to database: ", err);
        return;
    }
    console.log("Connected to DB...");
    connection.release(); // Release connection after testing

    // Start the server listening only if the database connection is successful
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is up and Running at : http://localhost:${PORT}`);
    });
});

// Express Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});