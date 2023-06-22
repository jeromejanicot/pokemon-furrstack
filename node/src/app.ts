import { createServer } from "./createServer";
import Trie from "./trie";
import axios from "axios";
import debug from "debug";

const log = debug("app:app.ts");

type PokemonsList = {
  name: string;
};

type PokemonResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

type PokemonMongo = {
  _id: string;
  name: string;
};

export const run = async () => {
  try {
    const { server } = await createServer();

    const pokemon = server.mongo.db?.collection("pokemon_list");
    let Pokemons: PokemonsList[] = [];
    if (pokemon && (await pokemon.estimatedDocumentCount()) == 0) {
      const offset = 20;
      const count = await axios({
        method: "get",
        url: "https://pokeapi.co/api/v2/pokemon/",
      }).then((res) => res.data.count);
      for (let i = 0; i < count; i += 20) {
        const res: PokemonResult = await axios({
          method: "get",
          url: `https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=${offset}`,
        }).then((res) => res.data);
        res.results.map((data) => Pokemons.push({ name: data.name }));
        if (Pokemons) {
          await pokemon.insertMany(Pokemons);
        }
      }
    } else if (pokemon && (await pokemon.estimatedDocumentCount()) > 1) {
      Pokemons = (await pokemon
        .find({})
        .project({ name: 1, _id: 0 })
        .toArray()) as PokemonsList[];
    }

    for (let i = 0; i < Pokemons.length; i++) {
      Trie.insert(Pokemons[i]!.name);
    }

    log("starting app");
    await server.listen({ port: 4500 });
  } catch (err) {
    log(err);
  }
};

run().catch((err) => console.log(err));
