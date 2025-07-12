import WarriorTypeModel from '../models/warrior_type.model.js';
import dotenv from 'dotenv';
dotenv.config();

class WarriorTypeController {
  async register(req, res) {
    try {
      const { Warrior_type_name, Admin_id } = req.body;
      // Validación básica
      if (!Warrior_type_name || !Admin_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      // Verificar si el tipo de guerrero ya existe
      const existingType = await WarriorTypeModel.findByName(Warrior_type_name);
      if (existingType) {
        return res.status(409).json({ error: 'El nombre del tipo de guerrero ya está en uso' });
      }
      const typeId = await WarriorTypeModel.create({ Warrior_type_name, Admin_id });
      res.status(201).json({ message: 'Tipo de guerrero creado exitosamente', id: typeId });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async show(req, res) {
    try {
      const types = await WarriorTypeModel.show();
      res.status(200).json({ message: 'Tipos de guerrero obtenidos exitosamente', data: types });
    } catch (error) {
      console.error('Error al mostrar tipos de guerrero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req, res) {
    try {
      const { Warrior_type_name, Admin_id } = req.body;
      const id = req.params.id;
      if (!Warrior_type_name || !Admin_id || !id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const existingType = await WarriorTypeModel.findById(id);
      if (!existingType) {
        return res.status(404).json({ error: 'El tipo de guerrero no existe' });
      }
      const updatedType = await WarriorTypeModel.update(id, { Warrior_type_name, Admin_id });
      res.status(200).json({ message: 'Tipo de guerrero actualizado exitosamente', data: updatedType });
    } catch (error) {
      console.error('Error al actualizar tipo de guerrero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const deletedType = await WarriorTypeModel.delete(id);
      res.status(200).json({ message: 'Tipo de guerrero eliminado exitosamente', data: deletedType });
    } catch (error) {
      console.error('Error al eliminar tipo de guerrero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const type = await WarriorTypeModel.findById(id);
      if (!type) {
        return res.status(404).json({ error: 'El tipo de guerrero no existe' });
      }
      res.status(200).json({ message: 'Tipo de guerrero encontrado', data: type });
    } catch (error) {
      console.error('Error al buscar tipo de guerrero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new WarriorTypeController(); 