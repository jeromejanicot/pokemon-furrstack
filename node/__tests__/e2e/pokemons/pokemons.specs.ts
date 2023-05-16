import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";
import app from "../../../src/app";
import { appRouter } from "../../../src/router";
import { createContextInner } from "../../../src/router/context";

describe("E2E test for the Pokemoons trpc route", async () => {
  const ctx = await createContextInner();
  const caller = appRouter.createCaller(ctx);
  beforeAll(() => {
    app.start();
  });
  afterAll(() => {
    app.stop();
  });
  it("makes a successful request to pokemons endpoint", async () => {
    const res = caller.pokemons.findOne("pikachu");

    expect(res).toBe({ name: "pikachu", type: ["electric"], weight: 60 });
  });
});
