// Importing required modules
import express from "express";

// Impporting our custom controllers
import { getYearlySales, getMothlySales, getDailySales, getCategorySales } from '../controllers/salesContorller.js';

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/getYearlySales", getYearlySales);
router.get("/getMonthlySales", getMothlySales);
router.get("/getDailySales", getDailySales);
router.get("/getCategorySales", getCategorySales);


// Exporting the router
export default router;