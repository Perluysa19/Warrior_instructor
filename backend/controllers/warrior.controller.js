import WarriorModel from '../models/warrior.model.js';

class WarriorController {

  async register(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Datos del formulario no recibidos' });
      }
      const { warrior_name, race_id, warrior_type_id, magic_id, admin_id } = req.body;
      const warrior_image = req.file ? req.file.filename : null;
      if (!warrior_name || !race_id || !warrior_type_id || !admin_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const existingWarrior = await WarriorModel.findByName(warrior_name);
      if (existingWarrior) {
        return res.status(409).json({ error: 'El nombre del guerrero ya está en uso' });
      }
      const warriorId = await WarriorModel.create({
        warrior_name,
        race_id,
        warrior_type_id,
        magic_id,
        admin_id,
        warrior_image
      });
      res.status(201).json({ message: 'Guerrero creado exitosamente', id: warriorId });
    } catch (error) {
      console.error('Error en el registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async show(req, res) {
    try {
      const warriors = await WarriorModel.show();
      if (!warriors || warriors.length === 0) {
        return res.status(404).json({ error: 'No hay guerreros registrados' });
      }
      res.status(200).json({ message: 'Guerreros obtenidos exitosamente', data: warriors });
    } catch (error) {
      console.error('Error al mostrar guerreros:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req, res) {
    try {
      if (!req.body) {
        return res.status(400).json({ error: 'Datos del formulario no recibidos' });
      }
      const { warrior_name, race_id, warrior_type_id, magic_id, admin_id } = req.body;
      const id = req.params.id;
      const warrior_image = req.file ? req.file.filename : null;
      if (!warrior_name || !race_id || !warrior_type_id || !admin_id || !id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const existingWarrior = await WarriorModel.findById(id);
      if (!existingWarrior) {
        return res.status(404).json({ error: 'El guerrero no existe' });
      }
      const updatedWarrior = await WarriorModel.update(id, {
        warrior_name,
        race_id,
        warrior_type_id,
        magic_id,
        admin_id,
        warrior_image
      });
      res.status(200).json({ message: 'Guerrero actualizado exitosamente', data: updatedWarrior });
    } catch (error) {
      console.error('Error al actualizar guerrero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const deletedWarrior = await WarriorModel.delete(id);
      res.status(200).json({ message: 'Guerrero eliminado exitosamente', data: deletedWarrior });
    } catch (error) {
      console.error('Error al eliminar guerrero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const warrior = await WarriorModel.findById(id);
      if (!warrior) {
        return res.status(404).json({ error: 'El guerrero no existe' });
      }
      res.status(200).json({ message: 'Guerrero encontrado exitosamente', data: warrior });
    } catch (error) {
      console.error('Error al buscar guerrero:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new WarriorController(); 