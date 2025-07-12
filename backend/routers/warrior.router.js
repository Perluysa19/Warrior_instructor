import { Router } from "express";
import WarriorController from '../controllers/warrior.controller.js';
import warriorImageUpload from '../middleware/warriorImageMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = Router();
const name = '/warrior';

// Rutas protegidas (solo administradores autenticados)
router.route(name)
  .post(verifyToken, warriorImageUpload, WarriorController.register) // Registrar un nuevo guerrero
  .get(verifyToken, WarriorController.show);     // Mostrar todos los guerreros

router.route(`${name}/:id`)
  .get(verifyToken, WarriorController.findById)  // Mostrar un guerrero por ID
  .put(verifyToken, warriorImageUpload, WarriorController.update)    // Actualizar un guerrero por ID
  .delete(verifyToken, WarriorController.delete);// Eliminar un guerrero por ID

export default router; 