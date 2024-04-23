// Importing required modules
import express from "express";

// Impporting our custom controllers
import { getAdmins, addAdmin, updateAdmin, deleteAdmin } from '../controllers/adminController.js';

// Creating a router
const router = express.Router();

// Defining the routes
router.get("/getAdmins", getAdmins);
router.post("/addAdmin", addAdmin);
router.put("/updateAdmin/:AdminID", updateAdmin);
router.delete("/deleteAdmin/:AdminID", deleteAdmin);

// Exporting the router
export default router;