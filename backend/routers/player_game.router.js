import { Router } from "express";
import PlayerGameController from '../controllers/player_game.controller.js';
const router = Router();
const name = '/player-game';

// Rutas públicas
router.route(name)
  .post(PlayerGameController.register) // Registrar un nuevo jugador en un juego
  .get(PlayerGameController.show);     // Mostrar todos los registros

// Rutas específicas para búsquedas
router.route(`${name}/game/:gameId`)
  .get(PlayerGameController.findByGame); // Mostrar jugadores de un juego específico

router.route(`${name}/player/:playerId`)
  .get(PlayerGameController.findByPlayer); // Mostrar juegos de un jugador específico

router.route(`${name}/:gameId/:playerId`)
  .get(PlayerGameController.findByGameAndPlayer)  // Mostrar registro específico
  .put(PlayerGameController.update)               // Actualizar registro
  .delete(PlayerGameController.delete);           // Eliminar registro

export default router; 