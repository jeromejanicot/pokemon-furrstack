import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";
import { appRouter } from "../../../src/router";
import { TestContext, createContextInner } from "../../../src/router/context";
import { createServer } from "../../../src/createServer";

/* type CallerType<T> = T extends (ctx: Context) => infer R ? R : never; */
/* type appRouterCaller = CallerType<typeof appRouter.createCaller>; */

let ctx: TestContext;
let caller: ReturnType<typeof appRouter.createCaller>;
describe("E2E test for the Pokemoons trpc route", () => {
  beforeAll(async () => {
    ctx = await createContextInner();

    caller = appRouter.createCaller(ctx);
    const { server } = await createServer();
    await server.listen({ port: 8080 });
  });
  afterAll((done) => {
    done();
  });
  it("makes a successful request to pokemons endpoint", async () => {
    const res = await caller.pokemons.findOne("pikachu");

    expect(res).toBe({ name: "pikachu", type: ["electric"], weight: 60 });
  });
});
