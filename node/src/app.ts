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

export const run = async () => {
  try {
    const { server } = await createServer();

    const pokemon = server.mongo.db?.collection("pokemon_list");
    let Pokemons: PokemonsList[] = [];
    const count = await axios({
      method: "get",
      url: "https://pokeapi.co/api/v2/pokemon/",
    }).then((res) => res.data.count);
    log("count from api");
    log(count);
    const exist = await pokemon?.estimatedDocumentCount();
    if (pokemon && exist == 0) {
      const offset = 20;
      for (let i = 0; i < count; i += 20) {
        const res: PokemonResult = await axios({
          method: "get",
          url: `https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=${offset}`,
        }).then((res) => res.data);
        log(`res from fetch with i=${i}`);
        log(res);
        res.results.map((data) => Pokemons.push({ name: data.name }));
        log("what Pokemons looks like");
        log(Pokemons);
      }
      if (Pokemons) {
        await pokemon.insertMany(Pokemons);
      }
    }
    Pokemons = (await pokemon!
      .find({})
      .project({ name: 1, _id: 0 })
      .toArray()) as PokemonsList[];
    log("Pokemon after fetch from db");
    log(Pokemons);

    for (let i = 0; i < Pokemons.length; i++) {
      Trie.insert(Pokemons[i]!.name as string);
    }

    log("starting app");
    await server.listen({ port: 4500 });
  } catch (err) {
    log(err);
  }
};

run().catch((err) => console.log(err));
