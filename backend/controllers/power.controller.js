import PowerModel from '../models/power.model.js';

class PowerController {

  async register(req, res) {
    try {
      const { power_name, admin_id } = req.body;

      // Validación básica
      if (!power_name || !admin_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const powerId = await PowerModel.create({ power_name, admin_id });
      res.status(201).json({
        message: 'Poder creado exitosamente',
        id: powerId
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async show(req, res) {
    try {
      const powers = await PowerModel.show();
      if (!powers || powers.length === 0) {
        return res.status(404).json({ error: 'No hay poderes registrados' });
      }
      res.status(200).json({
        message: 'Poderes obtenidos exitosamente',
        data: powers
      });
    } catch (error) {
      console.error('Error al mostrar poderes:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req, res) {
    try {
      const { power_name, admin_id } = req.body;
      const id = req.params.id;

      if (!power_name || !admin_id || !id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }

      const existingPower = await PowerModel.findById(id);
      if (!existingPower) {
        return res.status(404).json({ error: 'El poder no existe' });
      }

      const updatedPower = await PowerModel.update(id, { power_name, admin_id });
      res.status(200).json({
        message: 'Poder actualizado exitosamente',
        data: updatedPower
      });
    } catch (error) {
      console.error('Error al actualizar poder:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const deletedPower = await PowerModel.delete(id);
      res.status(200).json({
        message: 'Poder eliminado exitosamente',
        data: deletedPower
      });
    } catch (error) {
      console.error('Error al eliminar poder:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const power = await PowerModel.findById(id);
      if (!power) {
        return res.status(404).json({ error: 'El poder no existe' });
      }
      res.status(200).json({
        message: 'Poder encontrado exitosamente',
        data: power
      });
    } catch (error) {
      console.error('Error al buscar poder:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new PowerController(); 