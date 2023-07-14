import axios from "axios";
import debug from "debug";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { findInDatabase, saveToDatabase } from "./lib/utils";
import { NewPokemon, pokemons } from "../../db/schema";

const log = debug("app:pokemonsRCPS");

interface NewPokemonCore {
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: "url";
    };
  }[];
  weight: number;
}

export const pokemonsRouter = router({
  // zod transform input to lowercase
  // how do I get inference of pokemons proper type?
  findOne: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const dbEntry = await findInDatabase(ctx, pokemons, "name", input);
    if (dbEntry.length == 0) {
      log("pokemon not found in db, fetching it from the web");
      const fetched = (await axios({
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${input}/`,
      }).then((res) => res.data)) as NewPokemonCore;
      if (!fetched) {
        return "no such pokemon exists";
      }
      const newPokemon: NewPokemon = {
        name: fetched.name,
        types: fetched.types.reduce((acc: string[], curr) => {
          acc.push(curr.type?.name);
          return acc;
        }, []),
        weight: fetched.weight,
      };
      await saveToDatabase(ctx, pokemons, newPokemon);
      return newPokemon;
    }
    return dbEntry[0];
  }),
});
