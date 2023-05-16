import { appRouter } from "../../src/router";
import { db } from "../../src/db/db";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

function createTestContext() {
  return {
    db,
  };
}

/** A convenience method to call tRPC queries */
export const trpcRequest = () => {
  return appRouter.createCaller(createTestContext());
};
