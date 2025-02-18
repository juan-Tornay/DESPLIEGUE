const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const mongoose = require('mongoose'); // Importar mongoose
const app = express();
const tareasRoutes = require('./routes/tareas');

// Conectar a MongoDB
const mongoURI = 'mongodb+srv://juantornayiglesiasweb:juantor_626262@juantornaay.7e3be.mongodb.net/Despliegue?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors()); // Usar el middleware cors sin restricciones
app.use(express.json());
app.use('/tareas', tareasRoutes);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Handle other errors
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
