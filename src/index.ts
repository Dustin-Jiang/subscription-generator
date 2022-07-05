import fastify from "fastify";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

let args = yargs(hideBin(process.argv))
  .option("port", {
    description: "The port to bind on, default 3000.",
    type: "number",
    default: 3000,
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Display detailed logs.",
  })
  .help()
  .parse();

const server = fastify({
  logger: (args as any).verbose,
});

server.register(import("./app"))

const start = async (port: number) => {
  try {
    console.log(`Server starts listening on port ${port}.`);
    await server.listen({ port: port });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start((args as any).port);
