import RaceModel from '../models/race.model.js';
import dotenv from 'dotenv';
dotenv.config();

class RaceController {
  async register(req, res) {
    try {
      const { Race_name, Admin_id } = req.body;
      // Validación básica
      if (!Race_name || !Admin_id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      // Verificar si la raza ya existe
      const existingRace = await RaceModel.findByName(Race_name);
      if (existingRace) {
        return res.status(409).json({ error: 'El nombre de la raza ya está en uso' });
      }
      const raceId = await RaceModel.create({ Race_name, Admin_id });
      res.status(201).json({ message: 'Raza creada exitosamente', id: raceId });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async show(req, res) {
    try {
      const races = await RaceModel.show();
      res.status(200).json({ message: 'Razas obtenidas exitosamente', data: races });
    } catch (error) {
      console.error('Error al mostrar razas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async update(req, res) {
    try {
      const { Race_name, Admin_id } = req.body;
      const id = req.params.id;
      if (!Race_name || !Admin_id || !id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const existingRace = await RaceModel.findById(id);
      if (!existingRace) {
        return res.status(404).json({ error: 'La raza no existe' });
      }
      const updatedRace = await RaceModel.update(id, { Race_name, Admin_id });
      res.status(200).json({ message: 'Raza actualizada exitosamente', data: updatedRace });
    } catch (error) {
      console.error('Error al actualizar raza:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const deletedRace = await RaceModel.delete(id);
      res.status(200).json({ message: 'Raza eliminada exitosamente', data: deletedRace });
    } catch (error) {
      console.error('Error al eliminar raza:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
      }
      const race = await RaceModel.findById(id);
      if (!race) {
        return res.status(404).json({ error: 'La raza no existe' });
      }
      res.status(200).json({ message: 'Raza encontrada', data: race });
    } catch (error) {
      console.error('Error al buscar raza:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

export default new RaceController(); 