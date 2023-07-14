import { createServer } from "./createServer";
import { fetchAndBuild } from "./lib/fetchpokemons";
import Trie from "./trie";
import debug from "debug";

const log = debug("app:app.ts");

export const run = async () => {
  try {
    const { server } = await createServer();

    fetchAndBuild(server, Trie);

    log("starting app");
    await server.listen({ port: 4500 });
  } catch (err) {
    log(err);
  }
};

run().catch((err) => console.log(err));
