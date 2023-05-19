import axios from "axios";
import debug from "debug";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { findInDatabase, saveToDatabase } from "./lib/utils";
import { pokemons } from "../../db/schema";
/* import { eq } from "drizzle-orm"; */

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
    const dbEntry = await findInDatabase(ctx, pokemons, "name", input)
    if (!dbEntry) {

      log("pokemon not found in db, fetching it from the web");
      const fetched = await axios({
        method: "get",
        url: `https://pokeapi.co/api/v2/pokemon/${input}/`,
      }).then((res) => res.data);
      return fetched;
      /* log(fetched); */
      /* if (!fetched) { */
      /*   log("pokemon does not exist"); */
      /*   return "error"; */
      /* } */
      /* const newPokemon = { */
      /*   name: fetched?.body.name, */
      /*   types: fetched?.body.types, */
      /*   weight: fetched?.body.weight, */
      /* }; */
      /* // gonna block send request to external service? */
      /**/
      /* await ctx.db.insert(pokemons).values(newPokemon).returning(); */
      /* log(newPokemon); */
      /* return newPokemon; */
      //}
      /*   log("returning pokemon from db"); */
      /* return dbEntry; */
    }),
});
