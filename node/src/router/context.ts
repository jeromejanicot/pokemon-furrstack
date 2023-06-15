import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { db } from "../db/db";
import Trie from "../trie";

export interface User {
  name: string | string[];
}

export async function createContextInner() {
  return {
    db,
    Trie,
  };
}
export async function createContext(opts: CreateFastifyContextOptions) {
  const { req, res } = opts;
  const contextInner = await createContextInner();

  return { ...contextInner, req, res };
}

export type Context = inferAsyncReturnType<typeof createContextInner>;
