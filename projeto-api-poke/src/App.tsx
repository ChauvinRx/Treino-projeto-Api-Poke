import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AppContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  padding: 20px;
`;

const PokemonList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  padding: 0;
`;

const PokemonCard = styled.li`
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PokemonImage = styled.img`
  width: 100px;
  height: 100px;
`;

interface Pokemon {
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then(response => setPokemons(response.data.results))
      .catch(error => console.error('Erro ao buscar Pokémon:', error));
  }, []);

  return (
    <AppContainer>
      <h1>Pokédex</h1>
      <PokemonList>
        {pokemons.map((pokemon, index) => (
          <PokemonCard key={index}>
            <h2>{pokemon.name}</h2>
            <PokemonImage
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
              alt={pokemon.name}
            />
          </PokemonCard>
        ))}
      </PokemonList>
    </AppContainer>
  );
};

export default App;
