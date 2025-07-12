import { connect } from '../config/db/connectMysql.js';

class WarriorTypeModel {
  static async create({ Warrior_type_name, Admin_id }) {
    const [result] = await connect.query(
      'INSERT INTO warrior_type (Warrior_type_name, Admin_id) VALUES (?, ?)',
      [Warrior_type_name, Admin_id]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM warrior_type ORDER BY Warrior_type_id'
    );
    return rows;
  }

  static async showAll() {
    const [rows] = await connect.query(
      'SELECT * FROM warrior_type ORDER BY Warrior_type_id'
    );
    return rows;
  }

  static async update(id, { Warrior_type_name, Admin_id }) {
    const [result] = await connect.query(
      'UPDATE warrior_type SET Warrior_type_name = ?, Admin_id = ?, updated_at = CURRENT_TIMESTAMP WHERE Warrior_type_id = ?',
      [Warrior_type_name, Admin_id, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM warrior_type WHERE Warrior_type_id = ?',
      [id]
    );
    return result.affectedRows > 0 ? id : null;
  }

  static async findById(id) {
    const [rows] = await connect.query(
      'SELECT * FROM warrior_type WHERE Warrior_type_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByName(Warrior_type_name) {
    const [rows] = await connect.query(
      'SELECT * FROM warrior_type WHERE Warrior_type_name = ?',
      [Warrior_type_name]
    );
    return rows[0];
  }
}

export default WarriorTypeModel; 