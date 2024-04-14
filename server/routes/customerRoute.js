// Importing required modules
import express from "express";

// Impporting our custom controllers
import { addCustomer, deleteCustomer, getCustomers, updateCustomer } from "../controllers/customerController.js";

// Creating a express router
const router = express.Router();

// Defining the routes
router.get("/getCustomers", getCustomers);
router.post("/addCustomer", addCustomer);
router.put("/updateCustomer/:CustomerID", updateCustomer);
router.delete("/deleteCustomer/:CustomerID", deleteCustomer);

// Exporting the router
export default router;