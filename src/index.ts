import fastify from "fastify"
import { DateType, parseDateType } from "./dateType"
import { getSubscription } from "./getSubscription"

import yargs from "yargs"
import { hideBin } from "yargs/helpers"
import { AxiosError } from "axios"

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
  .parse()

const server = fastify({
  logger: (args as any).verbose
})

// DateType route
interface IDateType {
  baseUrl: string
  scheme: DateType
  extension: string
}

server.get<{
  Querystring: IDateType
}>("/DateType", async (request, response) => {
  let baseUrl = request.query.baseUrl
  let scheme = request.query.scheme.split("/") || ["yymmdd"]
  let extension = request.query.extension || ""

  if (baseUrl.at(-1) !== "/") baseUrl += "/"

  for (let i = 0; i < 5; i++) {
    let url =
      baseUrl +
      parseDateType(scheme as DateType[], i) +
      (extension ? "." + extension : "");

    try {
      let result = await getSubscription(url);
      response.status(200).send(result.data);
      break
    } catch (err) {
      console.error(`Failed with Axios Error [${(err as AxiosError).code}]. `);
      continue
    }
  }
  response.status(500).send("Fail to load from remote. ")
})

const start = async (port : number) => {
  try {
    console.log(`Server starts listening on port ${port}.`)
    await server.listen({ port: port })
  } catch(err) {
    console.error(err)
    process.exit(1)
  }
}

start((args as any).port)