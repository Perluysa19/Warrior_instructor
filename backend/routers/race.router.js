import { Router } from "express";
import RaceController from '../controllers/race.controller.js';
const router = Router();
const name = '/race';

// Rutas públicas
router.route(name)
  .post(RaceController.register) // Registrar una nueva raza
  .get(RaceController.show);    // Mostrar todas las razas

router.route(`${name}/:id`)
  .get(RaceController.findById) // Mostrar una raza por ID
  .put(RaceController.update)   // Actualizar una raza por ID
  .delete(RaceController.delete); // Eliminar una raza por ID

export default router; 