// Importing required modules
import express from "express";

// Impporting our custom controllers
import { getCategories, addCategory, updateCategory, deleteCategory } from '../controllers/categoriesController.js';

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/getCategories", getCategories);
router.post("/addCategory", addCategory);
router.put("/updateCategory/:CategoryID", updateCategory);
router.delete("/deleteCategory/:CategoryID", deleteCategory);

// Exporting the router
export default router;