import { Router } from "express";
import WarriorTypeController from '../controllers/warrior_type.controller.js';
const router = Router();
const name = '/warrior_type';

// Rutas públicas
router.route(name)
  .post(WarriorTypeController.register) // Registrar un nuevo tipo de guerrero
  .get(WarriorTypeController.show);     // Mostrar todos los tipos de guerrero

router.route(`${name}/:id`)
  .get(WarriorTypeController.findById)  // Mostrar un tipo de guerrero por ID
  .put(WarriorTypeController.update)    // Actualizar un tipo de guerrero por ID
  .delete(WarriorTypeController.delete);// Eliminar un tipo de guerrero por ID

export default router; 