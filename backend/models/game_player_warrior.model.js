import { connect } from '../config/db/connectMysql.js';

class GamePlayerWarriorModel {

  // Crear una nueva relación
  static async create({ Game_id, Player_id, Warrior_id }) {
    const [result] = await connect.query(
      'INSERT INTO game_player_warrior (Game_id, Player_id, Warrior_id) VALUES (?, ?, ?)',
      [Game_id, Player_id, Warrior_id]
    );
    // Retorna la relación recién creada
    return this.findById({ Game_id, Player_id, Warrior_id });
  }

  // Consultar todas las relaciones
  static async findAll() {
    const [rows] = await connect.query(
      'SELECT * FROM game_player_warrior ORDER BY Game_id, Player_id, Warrior_id'
    );
    return rows;
  }

  // Consultar una relación específica por su clave primaria compuesta
  static async findById({ Game_id, Player_id, Warrior_id }) {
    const [rows] = await connect.query(
      'SELECT * FROM game_player_warrior WHERE Game_id = ? AND Player_id = ? AND Warrior_id = ?',
      [Game_id, Player_id, Warrior_id]
    );
    return rows[0];
  }

  // Eliminar una relación específica
  static async delete({ Game_id, Player_id, Warrior_id }) {
    const [result] = await connect.query(
      'DELETE FROM game_player_warrior WHERE Game_id = ? AND Player_id = ? AND Warrior_id = ?',
      [Game_id, Player_id, Warrior_id]
    );
    return result.affectedRows > 0;
  }

  // (Opcional) Consultar todas las relaciones de un jugador en un juego
  static async findByGameAndPlayer({ Game_id, Player_id }) {
    const [rows] = await connect.query(
      'SELECT * FROM game_player_warrior WHERE Game_id = ? AND Player_id = ?',
      [Game_id, Player_id]
    );
    return rows;
  }
}

export default GamePlayerWarriorModel; 