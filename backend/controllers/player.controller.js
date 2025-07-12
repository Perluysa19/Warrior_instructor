import PlayerModel from '../models/player.model.js';

class PlayerController {

  async register(req, res) {
    try {
      const { player_name } = req.body;
      // Validación básica
      if (!player_name) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      // Verificar si el jugador ya existe
      const existingPlayer = await PlayerModel.findByName(player_name);
      if (existingPlayer) {
        return res.status(409).json({ error: 'El nombre de jugador ya está en uso' });
      }
      const playerId = await PlayerModel.create({ player_name });
      res.status(201).json({
        message: 'Jugador creado exitosamente',
        id: playerId
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async show(req, res) {
    try {
      const players = await PlayerModel.show();
      if (!players || players.length === 0) {
        return res.status(404).json({ error: 'No hay jugadores registrados' });
      }
      res.status(200).json({
        message: 'Jugadores obtenidos exitosamente',
        data: players
      });
    } catch (error) {
      console.error('Error al mostrar jugadores:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req, res) {
    try {
      const { player_name } = req.body;
      const id = req.params.id;
      if (!player_name || !id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const existingPlayer = await PlayerModel.findById(id);
      if (!existingPlayer) {
        return res.status(404).json({ error: 'El jugador no existe' });
      }
      const updatedPlayer = await PlayerModel.update(id, { player_name });
      res.status(200).json({
        message: 'Jugador actualizado exitosamente',
        data: updatedPlayer
      });
    } catch (error) {
      console.error('Error al actualizar jugador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const deletedPlayer = await PlayerModel.delete(id);
      res.status(200).json({
        message: 'Jugador eliminado exitosamente',
        data: deletedPlayer
      });
    } catch (error) {
      console.error('Error al eliminar jugador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const player = await PlayerModel.findById(id);
      if (!player) {
        return res.status(404).json({ error: 'El jugador no existe' });
      }
      res.status(200).json({
        message: 'Jugador encontrado exitosamente',
        data: player
      });
    } catch (error) {
      console.error('Error al buscar jugador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new PlayerController(); 