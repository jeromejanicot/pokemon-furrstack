import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const pokemons = pgTable("pokemons", {
  id: serial("id").primaryKey(),
  name: varchar("pokemon_name", { length: 256 }),
  types: varchar("pokemon_type", { length: 256 }).array(),
  weight: integer("pokemon_weight"),
});

export type Pokemon = InferModel<typeof pokemons>;
export type NewPokemon = InferModel<typeof pokemons, "insert">;
