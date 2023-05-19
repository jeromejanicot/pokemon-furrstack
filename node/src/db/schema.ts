import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const pokemons = pgTable("pokemons", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  types: varchar("types", { length: 256 }).array(),
  weight: integer("weight"),
});

export type Pokemon = InferModel<typeof pokemons>;
export type SelPokemon = InferModel<typeof pokemons, "select">;
export type NewPokemon = InferModel<typeof pokemons, "insert">;
