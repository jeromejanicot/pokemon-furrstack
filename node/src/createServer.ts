import fastify from "fastify";
import config from "./config";
import { fastifyMongodb } from "@fastify/mongodb";
import { fastifyPostgres } from "@fastify/postgres";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { fastifyCors } from "@fastify/cors";
import { appRouter } from "./router";
import { createContext } from "./router/context";
import debug from "debug";

const log = debug("app:createServer");

export const createServer = async () => {
  const server = fastify({ logger: true });
  await server.register(config);

  const conf = server.config;
  const prefix = conf && conf.PREFIX !== undefined ? conf.PREFIX : "trpc";

  log("mongo");
  await server.register(fastifyMongodb, {
    forceClose: true,
    url: "mongodb://mongo/pokemon",
  });

  log("postgres");
  await server.register(fastifyPostgres, {
    connectionString: "postgres://postgres@localhost/postgres",
  });

  log("cors");
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

  log("trpc");
  await server.register(fastifyTRPCPlugin, {
    prefix: prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  return { server };
};
