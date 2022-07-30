import axios, { AxiosError } from 'axios'

export async function getSubscription(url : string) {
  try {
    let result = axios.get(url)
    return result
  } catch(e : any) {
    throw new RequestError(e)
  }
}

export class RequestError extends Error {
  constructor(message: AxiosError) {
    super(message.message)
    this.name = "RequestError"
    this.message = message.message
  }
}