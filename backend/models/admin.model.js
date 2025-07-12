import { connect } from '../config/db/connectMysql.js';

class AdminModel {

  static async create({ admin_name, passwordHash, status = 1 }) {
    const [result] = await connect.query(
      'INSERT INTO admin (Admin_name, Admin_password, status) VALUES (?, ?, ?)',
      [admin_name, passwordHash, status]
    );
    return result.insertId;
  }

  static async show() {
    const [rows] = await connect.query(
      'SELECT * FROM admin ORDER BY admin_id'
    );
    return rows;
  }

  static async showActive() {
    const [rows] = await connect.query(
      'SELECT * FROM admin ORDER BY admin_id'
    );
    return rows;
  }

  static async update(admin_id, { admin_name, status }) {
    const [result] = await connect.query(
      'UPDATE admin SET Admin_name = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE Admin_id = ?',
      [admin_name, status, admin_id]
    );
    return result.affectedRows > 0 ? this.findById(admin_id) : null;
  }

  static async delete(admin_id) {
    const [result] = await connect.query(
      'DELETE FROM admin WHERE Admin_id = ?',
      [admin_id]
    );
    return result.affectedRows > 0 ? this.findById(admin_id) : null;
  }

  static async findById(admin_id) {
    const [rows] = await connect.query(
      'SELECT * FROM admin WHERE Admin_id = ?',
      [admin_id]
    );
    return rows[0];
  }

  static async findByIdActive(admin_id) {
    const [rows] = await connect.query(
      'SELECT * FROM admin WHERE Admin_id = ?',
      [admin_id]
    );
    return rows[0];
  }

  static async findByName(admin_name) {
    const [rows] = await connect.query(
      'SELECT Admin_id as admin_id, Admin_name as admin_name, Admin_password as admin_password, status, created_at, updated_at FROM admin WHERE Admin_name = ?',
      [admin_name]
    );
    return rows[0];
  }

  static async updateLogin(admin_id) {
    const [result] = await connect.query(
      'UPDATE admin SET updated_at = CURRENT_TIMESTAMP WHERE Admin_id = ?',
      [admin_id]
    );
    return result.affectedRows > 0 ? this.findById(admin_id) : null;
  }

}

export default AdminModel; 