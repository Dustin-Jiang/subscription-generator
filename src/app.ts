import { DateType, parseDateType } from "./dateType";
import { getSubscription } from "./getSubscription";

import { AxiosError } from "axios";
import { FastifyInstance } from "fastify";

export default (server : FastifyInstance, options: any, done: Function) => {
  // DateType route
  interface IDateType {
    baseUrl: string;
    scheme: DateType;
    extension: string;
  }

  server.get<{
    Querystring: IDateType;
  }>("/DateType", async (request, response) => {
    let baseUrl = request.query.baseUrl;
    let scheme = request.query.scheme.split("/") || ["yymmdd"];
    let extension = request.query.extension || "";

    if (baseUrl.at(-1) !== "/") baseUrl += "/";

    for (let i = 0; i < 5; i++) {
      let url =
        baseUrl +
        parseDateType(scheme as DateType[], i) +
        (extension ? "." + extension : "");

      try {
        let result = await getSubscription(url);
        response.status(200).send(result.data);
        break;
      } catch (err) {
        console.error(
          `Failed with Axios Error [${(err as AxiosError).code}]. `
        );
        continue;
      }
    }
    response.status(500).send("Fail to load from remote. ");
  });

  done()
};
