const express = require('express');
const router = express.Router();

let tareas = [];

router.get('/', (req, res) => {
  res.json(tareas);
});

router.post('/', (req, res) => {
  const { titulo, descripcion } = req.body;
  if (!titulo || !descripcion) {
    return res.status(400).json({ error: 'Titulo and Descripcion are required' });
  }
  const newTarea = { id: tareas.length + 1, titulo, descripcion };
  tareas.push(newTarea);
  res.status(201).json(newTarea);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tareas = tareas.filter(tarea => tarea.id !== parseInt(id));
  res.status(204).send();
});

module.exports = router;
