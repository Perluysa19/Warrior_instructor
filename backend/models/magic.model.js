import { connect } from '../config/db/connectMysql.js';

class MagicModel {

  static async create({ magic_type, admin_id }) {
    const [result] = await connect.query(
      'INSERT INTO magic (Magic_type, Admin_id) VALUES (?, ?)',
      [magic_type, admin_id]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM magic ORDER BY Magic_id'
    );
    return rows;
  }

  static async showAll() {
    const [rows] = await connect.query(
      'SELECT * FROM magic ORDER BY Magic_id'
    );
    return rows;
  }

  static async update(id, { magic_type, admin_id }) {
    const [result] = await connect.query(
      'UPDATE magic SET Magic_type = ?, Admin_id = ?, updated_at = CURRENT_TIMESTAMP WHERE Magic_id = ?',
      [magic_type, admin_id, id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async delete(id) {
    const [result] = await connect.query(
      'DELETE FROM magic WHERE Magic_id = ?',
      [id]
    );
    return result.affectedRows > 0 ? this.findById(id) : null;
  }

  static async findById(id) {
    const [rows] = await connect.query(
      'SELECT * FROM magic WHERE Magic_id = ?',
      [id]
    );
    return rows[0];
  }

  static async findByName(magic_type) {
    const [rows] = await connect.query(
      'SELECT * FROM magic WHERE Magic_type = ?',
      [magic_type]
    );
    return rows[0];
  }

}

export default MagicModel; 