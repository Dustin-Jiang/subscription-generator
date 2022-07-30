import { DateType, parseDateType } from "./dateType";
import { getSubscription, RequestError } from "./getSubscription";

import { AxiosError } from "axios";
import { FastifyInstance } from "fastify";

import fs from "fs"
import parseUrlFileType, { ParseError } from "./urlFileType";

export default (server : FastifyInstance, options: any, done: Function) => {
  // DateType route
  interface IDateType {
    baseUrl: string;
    scheme: DateType;
    extension: string;
  }

  interface IFileType {
    pageUrl: string;
    selector: string;
  }

  server.get("/", (request, response) => {
    response.header("Content-Type", "text/html")
    response.send(fs.createReadStream("./src/README.html", "utf-8"));
  })

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

  server.get<{
    Querystring: IFileType;
  }>("/FileType", async (request, response) => {
    let pageUrl = request.query.pageUrl;
    let selector = request.query.selector;

    try {
      let result = await parseUrlFileType(pageUrl, selector)
      response.send(result)
      return ;
    } catch (e) {
      if (e instanceof ParseError) {
        console.warn(e.message)
        response.status(404).send(e.message)
        return ;
      }
      if (e instanceof RequestError) {
        console.warn(e.message)
        response.status(500).send(e.message)
        return ;
      }
    }
  })

  done()
};
