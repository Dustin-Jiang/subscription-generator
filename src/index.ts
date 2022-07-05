import fastify from "fastify"
import { DateType, parseDateType } from "./dateType"
import { getSubscription } from "./getSubscription"

const server = fastify({
  logger: true
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
      console.error(err);
      continue
    }
  }
  response.status(500).send("Fail to load from remote. ")
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })
  } catch(err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()