import { Router } from "express";
import PlayerController from '../controllers/player.controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = Router();
const name = '/player';

// Ruta pública para registro de jugadores (login)
router.post(name, PlayerController.register); // Registrar un nuevo jugador (público)

// Rutas protegidas (solo administradores autenticados)
router.get(name, verifyToken, PlayerController.show);     // Mostrar todos los jugadores

router.route(`${name}/:id`)
  .get(verifyToken, PlayerController.findById)  // Mostrar un jugador por ID
  .put(verifyToken, PlayerController.update)    // Actualizar un jugador por ID
  .delete(verifyToken, PlayerController.delete);// Eliminar un jugador por ID

export default router; 