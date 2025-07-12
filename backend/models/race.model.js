import { connect } from '../config/db/connectMysql.js';

class RaceModel {
  static async create({ Race_name, Admin_id }) {
    const [result] = await connect.query(
      'INSERT INTO race (Race_name, Admin_id) VALUES (?, ?)',
      [Race_name, Admin_id]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM race ORDER BY Race_id'
    );
    return rows;
  }

  static async showAll() {
    const [rows] = await connect.query(
      'SELECT * FROM race ORDER BY Race_id'
    );
    return rows;
  }

  static async update(id, { Race_name, Admin_id }) {
    const [result] = await connect.query(
      'UPDATE race SET Race_name = ?, Admin_id = ?, updated_at = CURRENT_TIMESTAMP WHERE Race_id = ?',
      [Race_name, Admin_id, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM race WHERE Race_id = ?',
      [id]
    );
    return result.affectedRows > 0 ? id : null;
  }

  static async findById(id) {
    const [rows] = await connect.query(
      'SELECT * FROM race WHERE Race_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByName(Race_name) {
    const [rows] = await connect.query(
      'SELECT * FROM race WHERE Race_name = ?',
      [Race_name]
    );
    return rows[0];
  }
}

export default RaceModel; 