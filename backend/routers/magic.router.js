import { Router } from "express";
import MagicController from '../controllers/magic.controller.js';
const router = Router();
const name = '/magic';

// Rutas públicas
router.route(name)
  .post(MagicController.register) // Registrar una nueva magia
  .get(MagicController.show);     // Mostrar todas las magias

router.route(`${name}/:id`)
  .get(MagicController.findById)  // Mostrar una magia por ID
  .put(MagicController.update)    // Actualizar una magia por ID
  .delete(MagicController.delete);// Eliminar una magia por ID

export default router; 