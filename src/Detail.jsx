import React from 'react';
import { useParams } from 'react-router-dom';

function Detail({ data }) {
  const { id } = useParams();
  const pokemonId = parseInt(id, 10);

  const pokemon = data.find((p) => p.id === pokemonId);

  if (!pokemon) {
    return <div>Pokémon not found</div>;
  }

  const imageId = String(pokemon.id).padStart(3, '0');
  const imageUrl = `${process.env.PUBLIC_URL}/images/${imageId}.png`;

  return (
    <div>
      <h2>{pokemon.name.english} Details</h2>
      <img src={imageUrl} alt={pokemon.name.english} />
      <p>ID: {pokemon.id}</p>
      <p>Nom: {pokemon.name.french}</p>
      <p>Name: {pokemon.name.english}</p>
      <p>名称:{pokemon.name.japanese}</p>
      <p>名字:{pokemon.name.chinese}</p>
      <p>Type: {pokemon.type.join(', ')}</p>
      <p>HP: {pokemon.base.HP}</p>
      <p>Attack: {pokemon.base.Attack}</p>
      <p>Defense: {pokemon.base.Defense}</p>
      <p>Speed: {pokemon.base.Speed}</p>
      {/* Je n'ai pas mis SP Defence et Attack */}
    </div>
  );
}

export default Detail;
