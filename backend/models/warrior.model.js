import { connect } from '../config/db/connectMysql.js';

class WarriorModel {

  static async create({ warrior_name, race_id, warrior_type_id, magic_id, admin_id, warrior_image = null }) {
    const [result] = await connect.query(
      'INSERT INTO warrior (Warrior_name, Race_id, Warrior_type_id, Magic_id, Admin_id, Warrior_image) VALUES (?, ?, ?, ?, ?, ?)',
      [warrior_name, race_id, warrior_type_id, magic_id, admin_id, warrior_image]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM warrior ORDER BY Warrior_id'
    );
    return rows;
  }

  static async showActive() {
    const [rows] = await connect.query(
      'SELECT * FROM warrior ORDER BY Warrior_id'
    );
    return rows;
  }

  static async update(id, { warrior_name, race_id, warrior_type_id, magic_id, admin_id, warrior_image = null }) {
    const [result] = await connect.query(
      'UPDATE warrior SET Warrior_name = ?, Race_id = ?, Warrior_type_id = ?, Magic_id = ?, Admin_id = ?, Warrior_image = ?, updated_at = CURRENT_TIMESTAMP WHERE Warrior_id = ?',
      [warrior_name, race_id, warrior_type_id, magic_id, admin_id, warrior_image, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM warrior WHERE Warrior_id = ?',
      [id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async findById(id) {
    const [rows] = await connect.query(
      'SELECT * FROM warrior WHERE Warrior_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByIdActive(id) {
    const [rows] = await connect.query(
      'SELECT * FROM warrior WHERE Warrior_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByName(warrior_name) {
    const [rows] = await connect.query(
      'SELECT * FROM warrior WHERE Warrior_name = ?',
      [warrior_name]
    );
    return rows[0];
  }

  static async findByRace(race_id) {
    const [rows] = await connect.query(
      'SELECT * FROM warrior WHERE Race_id = ?',
      [race_id]
    );
    return rows;
  }

  static async findByWarriorType(warrior_type_id) {
    const [rows] = await connect.query(
      'SELECT * FROM warrior WHERE Warrior_type_id = ?',
      [warrior_type_id]
    );
    return rows;
  }

  static async findByAdmin(admin_id) {
    const [rows] = await connect.query(
      'SELECT * FROM warrior WHERE Admin_id = ?',
      [admin_id]
    );
    return rows;
  }
}
export default WarriorModel; 