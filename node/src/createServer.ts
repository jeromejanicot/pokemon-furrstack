import config from "./config";
import { fastifyPostgres } from "@fastify/postgres";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./router";
import { createContext } from "./router/context";
import { fastify } from "fastify";

const createServer = () => {
  const server = fastify({});
  void server.register(config);
  const conf = server.config;
  void server.register(fastifyPostgres, {
    connectionString: "postgres://postgres@localhost/postgres",
  });

  void server.register(fastifyTRPCPlugin, {
    prefix: conf.PREFIX,
    useWSS: true,
    trpcOptions: { router: appRouter, createContext },
  });

  const stop = async () => {
    server.close;
  };

  const start = async () => {
    try {
      await server.listen({ port: parseInt(conf.API_PORT) });
      console.log("listening on port", conf.API_PORT);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
};

export default createServer;
