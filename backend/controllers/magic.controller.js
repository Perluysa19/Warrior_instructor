import MagicModel from '../models/magic.model.js';

class MagicController {

  async register(req, res) {
    try {
      const { magic_type, admin_id } = req.body;

      // Validación básica
      if (!magic_type || !admin_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const magicId = await MagicModel.create({ magic_type, admin_id });
      res.status(201).json({
        message: 'Magia creada exitosamente',
        id: magicId
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async show(req, res) {
    try {
      const magics = await MagicModel.show();
      if (!magics || magics.length === 0) {
        return res.status(404).json({ error: 'No hay magias registradas' });
      }
      res.status(200).json({
        message: 'Magias obtenidas exitosamente',
        data: magics
      });
    } catch (error) {
      console.error('Error al mostrar magias:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req, res) {
    try {
      const { magic_type, admin_id } = req.body;
      const id = req.params.id;

      if (!magic_type || !admin_id || !id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const existingMagic = await MagicModel.findById(id);
      if (!existingMagic) {
        return res.status(404).json({ error: 'La magia no existe' });
      }

      const updatedMagic = await MagicModel.update(id, { magic_type, admin_id });
      res.status(200).json({
        message: 'Magia actualizada exitosamente',
        data: updatedMagic
      });
    } catch (error) {
      console.error('Error al actualizar magia:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const deletedMagic = await MagicModel.delete(id);
      res.status(200).json({
        message: 'Magia eliminada exitosamente',
        data: deletedMagic
      });
    } catch (error) {
      console.error('Error al eliminar magia:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const magic = await MagicModel.findById(id);
      if (!magic) {
        return res.status(404).json({ error: 'La magia no existe' });
      }
      res.status(200).json({
        message: 'Magia encontrada exitosamente',
        data: magic
      });
    } catch (error) {
      console.error('Error al buscar magia:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new MagicController(); 