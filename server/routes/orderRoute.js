// Importing required modules
import express from "express";

// Impporting our custom controllers
import { getOrders, addOrder, updateOrder, deleteOrder } from '../controllers/OrdersController.js';

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/getOrders", getOrders);
router.post("/addOrder", addOrder);
router.put("/updateOrder/:OrderID", updateOrder);
router.delete("/deleteOrder/:OrderID", deleteOrder);

// Exporting the router
export default router;