import fastify from "fastify";
import config from "./config";
import { fastifyPostgres } from "@fastify/postgres";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { fastifyCors } from "@fastify/cors";
import { appRouter } from "./router";
import { createContext } from "./router/context";
//import debug from "debug";

//const log = debug("app:createServer");

export const createServer = async () => {
  const server = fastify({ logger: true });
  await server.register(config);

  const conf = server.config;
  const prefix = conf && conf.PREFIX !== undefined ? conf.PREFIX : "trpc";

  await server.register(fastifyPostgres, {
    connectionString: "postgres://postgres@localhost/postgres",
  });

  await server.register(fastifyCors, {
    origin: (origin, cb) => {
      let hostname;
      if (origin !== undefined) {
        hostname = new URL(origin).hostname;
      }
      if (hostname == "localhost") {
        cb(null, true);
        return;
      }

      cb(new Error("not allowed"), false);
    },
  });

  await server.register(fastifyTRPCPlugin, {
    prefix: prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  return { server };
};
