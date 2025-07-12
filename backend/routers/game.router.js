import { Router } from "express";
import GameController from '../controllers/game.controller.js';
const router = Router();
const name = '/game';

// Rutas públicas
router.route(name)
  .post(GameController.register) // Registrar un nuevo juego
  .get(GameController.show);     // Mostrar todos los juegos

router.route(`${name}/:id`)
  .get(GameController.findById)  // Mostrar un juego por ID
  .put(GameController.update)    // Actualizar un juego por ID
  .delete(GameController.delete);// Eliminar un juego por ID

export default router; 