const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const tareasRoutes = require('./routes/tareas'); // Asegúrate que esta ruta esté correcta

const app = express();

const mongoURI = 'mongodb+srv://juantornayiglesiasweb:juan12345@cluster0.yjmbn.mongodb.net/DespliegueTrabajo?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use(cors());
app.use(express.json()); // Necesario para poder leer los datos del body de la petición

// Aquí estás usando las rutas de 'tareas'
app.use('/api/tareas', tareasRoutes); // Cambia la ruta para que sea compatible con Vercel

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({ error: 'No encontrado' });
});
app.use((err, req, res, next) => {
  console.error(err.stack); // Para loguear los errores
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 5000; // Usa la variable de entorno PORT
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app; // Exporta la app para Vercel
