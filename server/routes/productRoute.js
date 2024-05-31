// Importing required modules
import express from "express";

// Impporting our custom controllers
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/productsController.js';

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/getProducts", getProducts);
router.post("/addProduct", addProduct);
router.put("/updateProduct/:ProductID", updateProduct);
router.delete("/deleteProduct/:ProductID", deleteProduct);

// Exporting the router
export default router;