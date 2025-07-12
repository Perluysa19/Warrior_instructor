import AdminModel from '../models/admin.model.js';
import { encryptPassword, comparePassword } from '../library/appBcrypt.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

class AdminController {

  async register(req, res) {
    try {
      const { admin_name, admin_password } = req.body;
    
      // Basic validation
      if (!admin_name || !admin_password) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Additional validation
      if (admin_password.length < 8) {
        return res.status(400).json({
          error: 'The password must be at least 8 characters long.'
        });
      }
      // Verify if the Admin already exists
      const existingAdmin = await AdminModel.findByName(admin_name);
      if (existingAdmin) {
        return res.status(409).json({
          error: 'The admin name is already in use'
        });
      }
      const passwordHash = await encryptPassword(admin_password);
      const adminId = await AdminModel.create({
        admin_name,
        passwordHash
      });
      res.status(201).json({
        message: 'Admin created successfully',
        id: adminId
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req, res) {
    try {
      // Get all active admins
      const adminModel = await AdminModel.showActive();
      if (!adminModel) {
        return res.status(409).json({ error: 'No admins found' });
      }
      res.status(201).json({
        message: 'Admins retrieved successfully',
        data: adminModel
      });
    } catch (error) {
      console.error('Error in show:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
         const { admin_name } = req.body;
         const id = req.params.id;
      // Basic validation
      if (!admin_name || !id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Verify if the Admin already exists  
      const existingAdmin = await AdminModel.findByIdActive(id);
      if (existingAdmin.length === 0) {
        return res.status(409).json({ data:'', error: 'The Admin does not exist' });
      }   

      const updateAdminModel = await AdminModel.update(id, { admin_name });
      res.status(201).json({
        message: 'Admin updated successfully',
        data: updateAdminModel
      });
    } catch (error) {
      console.error('Error in update:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      // Basic validate
      if (!id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Intentar borrar el admin
      try {
        const deleteAdminModel = await AdminModel.delete(id);
        res.status(201).json({
          message: 'Admin deleted successfully',
          data: deleteAdminModel
        });
      } catch (err) {
        // Error de clave foránea
        if (err && err.code === 'ER_ROW_IS_REFERENCED_2') {
          return res.status(409).json({ error: 'No se puede eliminar el administrador porque está relacionado con otros registros.' });
        }
        throw err;
      }
    } catch (error) {
      console.error('Error in delete:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      // Basic validate
      if (!id) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Verify if the Admin already exists
      const existingAdminModel = await AdminModel.findByIdActive(id);
      if (!existingAdminModel) {
        return res.status(409).json({ error: 'The Admin does not exist' });
      }
      res.status(201).json({
        message: 'Admin retrieved successfully',
        data: existingAdminModel
      });
    } catch (error) {
      console.error('Error in findById:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      const { admin_name, admin_password } = req.body;
      // Basic validate
      if (!admin_name || !admin_password) {
        return res.status(400).json({ error: 'Required fields are missing' });
      }
      // Check if the admin already exists
      const existingAdmin = await AdminModel.findByName(admin_name);
      if (existingAdmin) {
        console.log('Admin found:', { 
          id: existingAdmin.admin_id, 
          name: existingAdmin.admin_name,
          passwordLength: existingAdmin.admin_password ? existingAdmin.admin_password.length : 0 
        });
        const passwordHash = await comparePassword(admin_password, existingAdmin.admin_password);
        console.log('Password comparison result:', passwordHash);
        if (!passwordHash) {
          return res.status(401).json({ error: 'Invalid password' });
        } else {
          const updateLogin = await AdminModel.updateLogin(existingAdmin.admin_id);
          if (!updateLogin) {
            return res.status(500).json({ error: 'Failed to update login time' });
          }
          const token = jwt.sign({ 
            id: existingAdmin.admin_id, 
            admin_name: existingAdmin.admin_name 
          }, process.env.JWT_SECRET, {
            expiresIn: "1h",
            algorithm: "HS256"
          });
          res.status(200).json({
            message: 'Login successful',
            admin: {
              id: existingAdmin.admin_id,
              admin_name: existingAdmin.admin_name,
              token: token
            }
          });
        }
      } else {
        return res.status(404).json({ error: 'Admin not found' });
      }
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new AdminController(); 