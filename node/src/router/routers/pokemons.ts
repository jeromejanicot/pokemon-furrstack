import fetch from "node-fetch";
import debug from "debug";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { pokemons, NewPokemon } from "../../db/schema";
import { findInDatabase, saveToDatabase } from "./lib/utils";

const log = debug("app:pokemonsRCPS");

interface NewPokemonCore {
  body: {
    name: string;
    types: string[];
    weight: number;
  };
}

export const pokemonsRouter = router({
  //zod transform input to lowercase
  // how do I get inference of pokemons proper type?
  findOne: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    await findInDatabase(ctx, pokemons, "name", input).then(
      async (dbEntry: NewPokemonCore) => {
        if (!dbEntry) {
          const res = (await fetch(
            `https://pokeapi.co/api/v2/pokemon/${input}/`,
          ).then((data) => data.json())) as NewPokemonCore;
          if (!res) {
            log(res);
            return "error";
          }
          const newPokemon: NewPokemon = {
            name: res?.body.name,
            types: res?.body.types,
            weight: res?.body.weight,
          };
          // gonna block send request to external service?
          await saveToDatabase(ctx, pokemons, newPokemon);
          log(newPokemon);
          return newPokemon;
        }
        return dbEntry;
      },
    );
  }),
});
