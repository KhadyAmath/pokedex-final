const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
const fs = require('fs'); 

const rawData = fs.readFileSync('./src/server/pokedex.json'); 
const POKEDEX = JSON.parse(rawData);


const schema = buildASTSchema(gql`
  type Query {
    pokemons: [Pokemon]
    pokemon(id: ID!): Pokemon
  }

  type Pokemon {
    id: ID
    name: PokemonName
    type: [String]
    base: PokemonBase
  }

  type PokemonName {
    english: String
    japanese: String
    chinese: String
    french: String
  }

  type PokemonBase {
    HP: Int
    Attack: Int
    Defense: Int
    Speed: Int
  }
`);

const mapPokemon = (pokemon, id) => pokemon && ({ id, ...pokemon });

const root = {
  pokemons: () => POKEDEX.map(mapPokemon),
  pokemon: ({ id }) => mapPokemon(POKEDEX[id], id),
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Execution du serveur GraphQL API sur le port:${port}/graphql`);
