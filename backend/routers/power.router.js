import { Router } from "express";
import PowerController from '../controllers/power.controller.js';
const router = Router();
const name = '/power';

// Rutas públicas
router.route(name)
  .post(PowerController.register) // Registrar un nuevo poder
  .get(PowerController.show);     // Mostrar todos los poderes

router.route(`${name}/:id`)
  .get(PowerController.findById)  // Mostrar un poder por ID
  .put(PowerController.update)    // Actualizar un poder por ID
  .delete(PowerController.delete);// Eliminar un poder por ID

export default router; 