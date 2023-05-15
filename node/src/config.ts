import "dotenv/config";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { debug } from "debug";

const log = debug("app:plugins-config");

export const NodeEnv = {
  development: "development",
  test: "test",
  production: "production",
} as const;

const ConfigSchema = z.object({
  NODE_ENV: z.nativeEnum(NodeEnv),
  LOG_LEVEL: z.string(),
  API_HOST: z.string(),
  API_PORT: z.string(),
  PREFIX: z.string(),
});

export type Config = z.infer<typeof ConfigSchema>;

const configPlugin: FastifyPluginAsync = async (server) => {
  try {
    ConfigSchema.parse(process.env);
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
