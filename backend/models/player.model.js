import { connect } from '../config/db/connectMysql.js';

class PlayerModel {

  static async create({ player_name }) {
    const [result] = await connect.query(
      'INSERT INTO player (Player_name) VALUES (?)',
      [player_name]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM player ORDER BY Player_id'
    );
    return rows;
  }

  static async showActive() {
    const [rows] = await connect.query(
      'SELECT * FROM player ORDER BY Player_id'
    );
    return rows;
  }

  static async update(id, { player_name }) {
    const [result] = await connect.query(
      'UPDATE player SET Player_name = ?, updated_at = CURRENT_TIMESTAMP WHERE Player_id = ?',
      [player_name, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM player WHERE Player_id = ?',
      [id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async findById(id) {
    const [rows] = await connect.query(
      'SELECT * FROM player WHERE Player_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByIdActive(id) {
    const [rows] = await connect.query(
      'SELECT * FROM player WHERE Player_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByName(player_name) {
    const [rows] = await connect.query(
      'SELECT * FROM player WHERE Player_name = ?',
      [player_name]
    );
    return rows[0];
  }

}

export default PlayerModel; 