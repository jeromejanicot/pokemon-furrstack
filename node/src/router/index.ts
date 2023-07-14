import { pokemonsRouter } from "./routers/pokemons";
import { pokemonAuto } from "./routers/autocomplete";
import { router } from "./trpc";

export const appRouter = router({
  pokemons: pokemonsRouter,
  pokemonAuto: pokemonAuto,
});

export type AppRouter = typeof appRouter;
