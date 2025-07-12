import { Router } from "express";
import AdminController from '../controllers/admin.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = Router();

// Public routes (no authentication required)
router.post('/login', AdminController.login); // Login an admin
router.post('/admin', AdminController.register); // Register a new admin

// Protected routes (authentication required)
router.get('/admin', verifyToken, AdminController.show); // Show all admins
router.get('/admin/:id', verifyToken, AdminController.findById); // Show an admin by ID
router.put('/admin/:id', verifyToken, AdminController.update); // Update an admin by ID
router.delete('/admin/:id', verifyToken, AdminController.delete); // Delete an admin by ID

export default router; 