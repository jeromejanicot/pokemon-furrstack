import { pokemonsRouter } from "./routers/pokemons";
import { router } from "./trpc";

export const appRouter = router({
  pokemons: pokemonsRouter,
});

export type AppRouter = typeof appRouter;
