import { connect } from '../config/db/connectMysql.js';

class GameModel {

  static async create({ game_name, game_public, game_code, player_id }) {
    const [result] = await connect.query(
      'INSERT INTO game (Game_name, Game_Public, Game_Code, Player_id) VALUES (?, ?, ?, ?)',
      [game_name, game_public, game_code, player_id]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM game ORDER BY Game_id'
    );
    return rows;
  }

  static async showAll() {
    const [rows] = await connect.query(
      'SELECT * FROM game ORDER BY Game_id'
    );
    return rows;
  }

  static async update(id, { game_name, game_public, game_code, player_id }) {
    const [result] = await connect.query(
      'UPDATE game SET Game_name = ?, Game_Public = ?, Game_Code = ?, Player_id = ?, updated_at = CURRENT_TIMESTAMP WHERE Game_id = ?',
      [game_name, game_public, game_code, player_id, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM game WHERE Game_id = ?',
      [id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async findById(id) {
    const [rows] = await connect.query(
      'SELECT * FROM game WHERE Game_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByName(game_name) {
    const [rows] = await connect.query(
      'SELECT * FROM game WHERE Game_name = ?',
      [game_name]
    );
    return rows[0];
  }

}

export default GameModel; 