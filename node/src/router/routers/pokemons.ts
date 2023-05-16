import axios from "axios";
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
    await findInDatabase(ctx, pokemons, "name" as keyof object, input).then(
      async (dbEntry) => {
        if (!dbEntry) {
          log("axios fetch");
          const res = await axios<NewPokemonCore>({
            method: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${input}/`,
          }).then((res) => res.data);
          log(res);
          if (!res) {
            log("no res");
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
