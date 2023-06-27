import * as dotenv from "dotenv";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { debug } from "debug";

dotenv.config();

const log = debug("app:plugins-config");

export const NodeEnv = {
  development: "development",
  test: "test",
  production: "production",
} as const;

const ConfigSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv).optional(),
  LOG_LEVEL: z.string().optional(),
  API_HOST: z.string().optional(),
  API_PORT: z.string().optional(),
  PREFIX: z.string().optional(),
  MONGO_INITDB_USERNAME: z.string(),
  MONGO_INITDB_PASSWORD: z.string(),
  MONGO_INITDB_DATABASE: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

const configPlugin: FastifyPluginAsync = async (server) => {
  try {
    ConfigSchema.parse(process.env);
    log("app-config:server.decorate");
    server.decorate("config", process.env);
  } catch (err) {
    log("environment variables not valid:", err);
  }
};

declare module "fastify" {
  interface FastifyInstance {
    readonly config: Config;
  }
}

export default fp(configPlugin);
