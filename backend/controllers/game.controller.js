import GameModel from '../models/game.model.js';

class GameController {

  async register(req, res) {
    try {
      const { game_name, game_public, game_code, player_id } = req.body;

      // Validación básica
      if (!game_name || game_public === undefined || !player_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      // Verificar si el juego ya existe (por nombre)
      const existingGame = await GameModel.findByName(game_name);
      if (existingGame) {
        return res.status(409).json({
          error: 'El nombre del juego ya está en uso'
        });
      }

      const gameId = await GameModel.create({ game_name, game_public, game_code, player_id });
      res.status(201).json({
        message: 'Juego creado exitosamente',
        id: gameId
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async show(req, res) {
    try {
      const games = await GameModel.show();
      if (!games || games.length === 0) {
        return res.status(404).json({ error: 'No hay juegos registrados' });
      }
      res.status(200).json({
        message: 'Juegos obtenidos exitosamente',
        data: games
      });
    } catch (error) {
      console.error('Error al mostrar juegos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req, res) {
    try {
      const { game_name, game_public, game_code, player_id } = req.body;
      const id = req.params.id;

      if (!game_name || game_public === undefined || !player_id || !id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const existingGame = await GameModel.findById(id);
      if (!existingGame) {
        return res.status(404).json({ error: 'El juego no existe' });
      }

      const updatedGame = await GameModel.update(id, { game_name, game_public, game_code, player_id });
      res.status(200).json({
        message: 'Juego actualizado exitosamente',
        data: updatedGame
      });
    } catch (error) {
      console.error('Error al actualizar juego:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const deletedGame = await GameModel.delete(id);
      res.status(200).json({
        message: 'Juego eliminado exitosamente',
        data: deletedGame
      });
    } catch (error) {
      console.error('Error al eliminar juego:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const game = await GameModel.findById(id);
      if (!game) {
        return res.status(404).json({ error: 'El juego no existe' });
      }
      res.status(200).json({
        message: 'Juego encontrado exitosamente',
        data: game
      });
    } catch (error) {
      console.error('Error al buscar juego:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new GameController(); 