import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState(null);

  const fetchTareas = async () => {
    try {
      const response = await fetch('https://despliegue-3.onrender.com/api/tareas'); // Actualiza la URL del backend
      if (!response.ok) {
        throw new Error('Error fetching tareas');
      }
      const result = await response.json();
      setTareas(result);
      setError(null);
    } catch (error) {
      console.error('Fetch error:', error); // Log the error to the console
      setError('Error fetching tareas');
    }
  };

  const addTarea = async () => {
    try {
      const response = await fetch('https://despliegue-3.onrender.com/api/tareas', { // Actualiza la URL del backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, descripcion }),
      });
      if (!response.ok) {
        throw new Error('Error adding tarea');
      }
      const newTarea = await response.json();
      setTareas([...tareas, newTarea]);
      setTitulo('');
      setDescripcion('');
      setError(null);
    } catch (error) {
      console.error('Error adding tarea:', error); // Log the error to the console
      setError('Error adding tarea');
    }
  };

  const deleteTarea = async (id) => {
    try {
      const response = await fetch(`https://despliegue-3.onrender.com/api/tareas/${id}`, { // Actualiza la URL del backend
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting tarea');
      }
      setTareas(tareas.filter(tarea => tarea._id !== id));
      setError(null);
    } catch (error) {
      console.error('Error deleting tarea:', error); // Log the error to the console
      setError('Error deleting tarea');
    }
  };

  useEffect(() => {
    fetchTareas();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestión de Tareas</h1>
        <div>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button onClick={addTarea}>Añadir Tarea</button>
        </div>
        {error && <p>{error}</p>}
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea._id}>
              <h2>{tarea.titulo}</h2>
              <p>{tarea.descripcion}</p>
              <button onClick={() => deleteTarea(tarea._id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
