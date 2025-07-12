import PlayerGameModel from '../models/player_game.model.js';

class PlayerGameController {

  async register(req, res) {
    try {
      const { game_id, player_id } = req.body;
    
      // Validación básica
      if (!game_id || !player_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      // Verificar si la relación ya existe
      const existingPlayerGame = await PlayerGameModel.findByGameAndPlayer(game_id, player_id);
      if (existingPlayerGame) {
        return res.status(409).json({
          error: 'El jugador ya está registrado en este juego'
        });
      }

      const playerGameId = await PlayerGameModel.create({
        game_id,
        player_id
      });

      res.status(201).json({
        message: 'Jugador registrado en el juego exitosamente',
        id: playerGameId
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async show(req, res) {
    try {
      const playerGames = await PlayerGameModel.show();
      if (!playerGames || playerGames.length === 0) {
        return res.status(404).json({ error: 'No hay registros de jugadores en juegos' });
      }
      res.status(200).json({
        message: 'Registros de jugadores en juegos obtenidos exitosamente',
        data: playerGames
      });
    } catch (error) {
      console.error('Error al mostrar registros:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req, res) {
    try {
      const { game_id, player_id } = req.body;
      const { gameId, playerId } = req.params;

      // Validación básica
      if (!game_id || !player_id || !gameId || !playerId) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      // Verificar si el registro existe
      const existingPlayerGame = await PlayerGameModel.findByGameAndPlayer(gameId, playerId);
      if (!existingPlayerGame) {
        return res.status(404).json({ error: 'El registro no existe' });
      }

      const updatedPlayerGame = await PlayerGameModel.update(gameId, playerId, {
        game_id,
        player_id
      });

      res.status(200).json({
        message: 'Registro actualizado exitosamente',
        data: updatedPlayerGame
      });
    } catch (error) {
      console.error('Error al actualizar registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const { gameId, playerId } = req.params;
      if (!gameId || !playerId) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const deletedPlayerGame = await PlayerGameModel.delete(gameId, playerId);
      res.status(200).json({
        message: 'Jugador eliminado del juego exitosamente',
        data: deletedPlayerGame
      });
    } catch (error) {
      console.error('Error al eliminar registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByGame(req, res) {
    try {
      const gameId = req.params.gameId;
      if (!gameId) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const playerGames = await PlayerGameModel.findByGame(gameId);
      if (!playerGames || playerGames.length === 0) {
        return res.status(404).json({ error: 'No hay jugadores registrados en este juego' });
      }

      res.status(200).json({
        message: 'Jugadores del juego obtenidos exitosamente',
        data: playerGames
      });
    } catch (error) {
      console.error('Error al buscar jugadores del juego:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByPlayer(req, res) {
    try {
      const playerId = req.params.playerId;
      if (!playerId) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const playerGames = await PlayerGameModel.findByPlayer(playerId);
      if (!playerGames || playerGames.length === 0) {
        return res.status(404).json({ error: 'El jugador no está registrado en ningún juego' });
      }

      res.status(200).json({
        message: 'Juegos del jugador obtenidos exitosamente',
        data: playerGames
      });
    } catch (error) {
      console.error('Error al buscar juegos del jugador:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findByGameAndPlayer(req, res) {
    try {
      const { gameId, playerId } = req.params;
      if (!gameId || !playerId) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const playerGame = await PlayerGameModel.findByGameAndPlayer(gameId, playerId);
      if (!playerGame) {
        return res.status(404).json({ error: 'El registro no existe' });
      }

      res.status(200).json({
        message: 'Registro encontrado exitosamente',
        data: playerGame
      });
    } catch (error) {
      console.error('Error al buscar registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new PlayerGameController(); 