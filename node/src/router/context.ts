import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { db } from "../db/db";

export interface User {
  name: string | string[];
}
export function createContext({ req, res }: CreateFastifyContextOptions) {
  // auth
  // db details
  return { req, res, db };
}

export type Context = inferAsyncReturnType<typeof createContext>;
