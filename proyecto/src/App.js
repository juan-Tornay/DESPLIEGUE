import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // PokeAPI tiene 898 Pokémon en la generación actual
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!response.ok) {
        throw new Error('Error');
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError('Error en el fetch');
      setData(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicacion front-end</h1>
        <button onClick={fetchData}>Pulsa aquí</button>
        {error && <p>{error}</p>}
        {data && (
          <div>
            <h2>{data.name}</h2>
            <img src={data.sprites.front_default} alt={data.name} />
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
            <p>Base Experience: {data.base_experience}</p>
            <h3>Abilities:</h3>
            <ul>
              {data.abilities.map((ability, index) => (
                <li key={index}>{ability.ability.name}</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
