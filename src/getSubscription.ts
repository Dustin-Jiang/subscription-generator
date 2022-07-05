import axios from 'axios'

export async function getSubscription(url : string) {
  return axios.get(url)
}