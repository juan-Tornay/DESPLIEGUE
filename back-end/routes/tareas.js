const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Esquema de la tarea
const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  creada: { type: Date, default: Date.now }
});

const Tarea = mongoose.model('Tarea', tareaSchema);

// Ruta para obtener todas las tareas
router.get('/', async (req, res) => {
  console.log('GET /tareas'); // Esto verificará si la ruta está siendo llamada
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Ruta para crear una tarea
router.post('/', async (req, res) => {
  console.log('POST /tareas', req.body); // Esto mostrará los datos de la tarea enviada
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ error: 'Titulo y Descripcion son requeridos' });
    }
    console.log('Datos recibidos:', { titulo, descripcion }); // Verificar que los datos están bien antes de guardarlos
    const nuevaTarea = new Tarea({ titulo, descripcion });
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error('Error al crear tarea:', error); // Mostrar detalles del error
    res.status(500).json({ error: 'Error interno al crear tarea', details: error.message });
  }
});

// Ruta para eliminar una tarea
router.delete('/:id', async (req, res) => {
  console.log('DELETE /tareas/:id', req.params.id); // Esto mostrará el ID de la tarea a eliminar
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.status(204).end(); // No content
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
});

module.exports = router;
