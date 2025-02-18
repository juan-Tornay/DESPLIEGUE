const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const app = express();
const tareasRoutes = require('./routes/tareas');

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
