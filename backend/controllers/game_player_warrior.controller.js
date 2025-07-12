import GamePlayerWarriorModel from '../models/game_player_warrior.model.js';

class GamePlayerWarriorController {
  // Crear una nueva relación
  async create(req, res) {
    try {
      const { Game_id, Player_id, Warrior_id } = req.body;
      // Validación básica
      if (!Game_id || !Player_id || !Warrior_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      // Aquí podrías validar que los IDs existan en sus tablas respectivas
      const result = await GamePlayerWarriorModel.create({ Game_id, Player_id, Warrior_id });
      res.status(201).json({
        message: 'Relación creada exitosamente',
        data: result
      });
    } catch (error) {
      console.error('Error al crear relación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Consultar todas las relaciones
  async findAll(req, res) {
    try {
      const data = await GamePlayerWarriorModel.findAll();
      res.status(200).json({
        message: 'Relaciones encontradas',
        data
      });
    } catch (error) {
      console.error('Error al consultar relaciones:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Consultar una relación específica
  async findById(req, res) {
    try {
      const { Game_id, Player_id, Warrior_id } = req.params;
      if (!Game_id || !Player_id || !Warrior_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const data = await GamePlayerWarriorModel.findById({ Game_id, Player_id, Warrior_id });
      if (!data) {
        return res.status(404).json({ error: 'Relación no encontrada' });
      }
      res.status(200).json({
        message: 'Relación encontrada',
        data
      });
    } catch (error) {
      console.error('Error al consultar relación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  // Eliminar una relación específica
  async delete(req, res) {
    try {
      const { Game_id, Player_id, Warrior_id } = req.params;
      if (!Game_id || !Player_id || !Warrior_id) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const result = await GamePlayerWarriorModel.delete({ Game_id, Player_id, Warrior_id });
      if (!result) {
        return res.status(404).json({ error: 'Relación no encontrada para eliminar' });
      }
      res.status(200).json({
        message: 'Relación eliminada exitosamente',
        data: result
      });
    } catch (error) {
      console.error('Error al eliminar relación:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new GamePlayerWarriorController(); 