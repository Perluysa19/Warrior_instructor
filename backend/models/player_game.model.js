import { connect } from '../config/db/connectMysql.js';

class PlayerGameModel {

  static async create({ game_id, player_id }) {
    const [result] = await connect.query(
      'INSERT INTO player_game (Game_id, Player_id) VALUES (?, ?)',
      [game_id, player_id]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM player_game ORDER BY Game_id, Player_id'
    );
    return rows;
  }

  static async showActive() {
    const [rows] = await connect.query(
      'SELECT * FROM player_game ORDER BY Game_id, Player_id'
    );
    return rows;
  }

  static async update(gameId, playerId, { game_id, player_id }) {
    const [result] = await connect.query(
      'UPDATE player_game SET Game_id = ?, Player_id = ?, updated_at = CURRENT_TIMESTAMP WHERE Game_id = ? AND Player_id = ?',
      [game_id, player_id, gameId, playerId]
    );
    return result.affectedRows > 0 ? this.findByGameAndPlayer(game_id, player_id) : null;
  }

  static async delete(gameId, playerId) {
    const [result] = await connect.query(
      'DELETE FROM player_game WHERE Game_id = ? AND Player_id = ?',
      [gameId, playerId]
    );
    return result.affectedRows > 0 ? { game_id: gameId, player_id: playerId } : null;
  }

  static async findByGameAndPlayer(gameId, playerId) {
    const [rows] = await connect.query(
      'SELECT * FROM player_game WHERE Game_id = ? AND Player_id = ?',
      [gameId, playerId]
    );
    return rows[0];
  }

  static async findByGame(gameId) {
    const [rows] = await connect.query(
      'SELECT pg.*, p.Player_name, g.Game_name FROM player_game pg ' +
      'INNER JOIN player p ON pg.Player_id = p.Player_id ' +
      'INNER JOIN game g ON pg.Game_id = g.Game_id ' +
      'WHERE pg.Game_id = ?',
      [gameId]
    );
    return rows;
  }

  static async findByPlayer(playerId) {
    const [rows] = await connect.query(
      'SELECT pg.*, p.Player_name, g.Game_name FROM player_game pg ' +
      'INNER JOIN player p ON pg.Player_id = p.Player_id ' +
      'INNER JOIN game g ON pg.Game_id = g.Game_id ' +
      'WHERE pg.Player_id = ?',
      [playerId]
    );
    return rows;
  }

  static async findByIdActive(gameId, playerId) {
    const [rows] = await connect.query(
      'SELECT * FROM player_game WHERE Game_id = ? AND Player_id = ?',
      [gameId, playerId]
    );
    return rows[0];
  }

  static async countPlayersByGame(gameId) {
    const [rows] = await connect.query(
      'SELECT COUNT(*) as player_count FROM player_game WHERE Game_id = ?',
      [gameId]
    );
    return rows[0].player_count;
  }

  static async countGamesByPlayer(playerId) {
    const [rows] = await connect.query(
      'SELECT COUNT(*) as game_count FROM player_game WHERE Player_id = ?',
      [playerId]
    );
    return rows[0].game_count;
  }

  static async getGamesWithPlayerCount() {
    const [rows] = await connect.query(
      'SELECT g.Game_id, g.Game_name, g.Game_Public, g.Game_Code, COUNT(pg.Player_id) as player_count ' +
      'FROM game g ' +
      'LEFT JOIN player_game pg ON g.Game_id = pg.Game_id ' +
      'GROUP BY g.Game_id, g.Game_name, g.Game_Public, g.Game_Code ' +
      'ORDER BY g.Game_id'
    );
    return rows;
  }

  static async getPlayersWithGameCount() {
    const [rows] = await connect.query(
      'SELECT p.Player_id, p.Player_name, COUNT(pg.Game_id) as game_count ' +
      'FROM player p ' +
      'LEFT JOIN player_game pg ON p.Player_id = pg.Player_id ' +
      'GROUP BY p.Player_id, p.Player_name ' +
      'ORDER BY p.Player_id'
    );
    return rows;
  }

}
export default PlayerGameModel; 