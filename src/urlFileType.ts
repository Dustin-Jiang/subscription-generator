import { getSubscription } from "./getSubscription"
import { JSDOM } from "jsdom"

export default async function parseUrlFileType(
  pageUrl: string, 
  selector: string
) {
  let document : Document
  try {
    let response = await getSubscription(pageUrl)
    let window = new JSDOM(response.data, { pretendToBeVisual: true }).window
    window.requestAnimationFrame(timestamp => {
      console.log(timestamp > 0)
    })
    document = window.document
  }
  catch(e) {
    throw e
  }
  let urlContext = document.querySelector(selector)?.innerHTML
  if (urlContext === undefined) {
    throw new ParseError(selector)
  }

  let url : string
  let urlReg = new RegExp("(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]")
  let urlPairResult = urlContext.match(urlReg)
  if (urlPairResult === null) {
    throw new ParseError(selector)
  } else {
    url = urlPairResult[0]
  }
  if (urlContext === undefined) {
    throw new ParseError(selector);
  }

  let result
  try {
    result = await getSubscription(url)
  } catch (e) {
    throw e
  }

  return result.data
}

export class ParseError extends Error {
  message: string
  name: string
  constructor(selector: string) {
    super(`ParseError: selector ${selector} matches no element.`)
    this.message = `ParseError: selector ${selector} matches no element.`
    this.name = "ParseError"
  }
}