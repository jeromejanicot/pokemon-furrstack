import config from "./config";
import { fastifyPostgres } from "@fastify/postgres";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./router";
import { createContext } from "./router/context";
import { fastify } from "fastify";

export const createServer = () => {
  const server = fastify({});
  void server.register(config);
  const conf = server.config;
  const prefix = conf && conf.PREFIX !== undefined ? conf.PREFIX : "trpc";
  const port =
    conf && conf.API_PORT !== undefined ? parseInt(conf.API_PORT) : 8080;
  void server.register(fastifyPostgres, {
    connectionString: "postgres://postgres@localhost/postgres",
  });

  void server.register(fastifyTRPCPlugin, {
    prefix: prefix,
    trpcOptions: { router: appRouter, createContext },
  });

  const stop = async () => {
    server.close;
  };

  const start = async () => {
    try {
      await server.listen({ port: port });
      console.log("app-server: listening on port", port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
};
