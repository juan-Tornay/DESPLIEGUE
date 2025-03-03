const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Definir el esquema de Tarea
const tareaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String
}, { collection: 'Tareas' }); // Usar la colección 'Tareas'

// Crear el modelo de Tarea
const Tarea = mongoose.model('Tarea', tareaSchema);

router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (err) {
    console.error('Error fetching tareas:', err); // Log the error to the console
    res.status(500).json({ error: 'Error fetching tareas' });
  }
});

router.post('/', async (req, res) => {
  const { titulo, descripcion } = req.body;
  if (!titulo || !descripcion) {
    return res.status(400).json({ error: 'Titulo and Descripcion are required' });
  }
  const newTarea = new Tarea({ titulo, descripcion });
  try {
    const savedTarea = await newTarea.save();
    res.status(201).json(savedTarea);
  } catch (err) {
    console.error('Error adding tarea:', err); // Log the error to the console
    res.status(500).json({ error: 'Error adding tarea' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Tarea.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting tarea:', err); // Log the error to the console
    res.status(500).json({ error: 'Error deleting tarea' });
  }
});

module.exports = router;
