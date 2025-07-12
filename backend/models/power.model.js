import { connect } from '../config/db/connectMysql.js';

class PowerModel {

  static async create({ power_name, admin_id }) {
    const [result] = await connect.query(
      'INSERT INTO power (Power_name, Admin_id) VALUES (?, ?)',
      [power_name, admin_id]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM power ORDER BY Power_id'
    );
    return rows;
  }

  static async showAll() {
    const [rows] = await connect.query(
      'SELECT * FROM power ORDER BY Power_id'
    );
    return rows;
  }

  static async update(id, { power_name, admin_id }) {
    const [result] = await connect.query(
      'UPDATE power SET Power_name = ?, Admin_id = ?, updated_at = CURRENT_TIMESTAMP WHERE Power_id = ?',
      [power_name, admin_id, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM power WHERE Power_id = ?',
      [id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async findById(id) {
    const [rows] = await connect.query(
      'SELECT * FROM power WHERE Power_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByName(power_name) {
    const [rows] = await connect.query(
      'SELECT * FROM power WHERE Power_name = ?',
      [power_name]
    );
    return rows[0];
  }

}

export default PowerModel; 