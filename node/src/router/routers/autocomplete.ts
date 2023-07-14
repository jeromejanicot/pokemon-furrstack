import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const pokemonAuto = router({
  suggestRec: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const autoComplete = ctx.Trie.search(input);
      return autoComplete;
    }),
});
