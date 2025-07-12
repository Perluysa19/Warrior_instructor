import { Router } from "express";
import GamePlayerWarriorController from '../controllers/game_player_warrior.controller.js';
const router = Router();
const name = '/game-player-warrior';

// Ruta para crear y mostrar todas las relaciones
router.route(name)
  .post(GamePlayerWarriorController.create) // Crear una nueva relación
  .get(GamePlayerWarriorController.findAll); // Mostrar todas las relaciones

// Ruta para operaciones sobre una relación específica (por clave compuesta)
router.route(`${name}/:Game_id/:Player_id/:Warrior_id`)
  .get(GamePlayerWarriorController.findById) // Mostrar una relación específica
  .delete(GamePlayerWarriorController.delete); // Eliminar una relación específica

export default router; 