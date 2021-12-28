import axios from 'axios'
import { logger } from './logger'

//const includeCredentials:boolean = false;

const get = async (endpoint: string, headers = {}) => {
  try {
    const req = await axios.get(endpoint, { headers })
    return Promise.resolve({ status: req.status, data: req.data })
  } catch (err) {
    logger('AXIOS GET ERROR: ', err)
    return Promise.reject(err)
  }
}

const post = async (endpoint: string, data = {}, headers = {}) => {
  try {
    const req = await axios.post(endpoint, data, { headers })
    return Promise.resolve({ status: req.status, data: req.data })
  } catch (err) {
    logger('POST ERROR::', err)
    return Promise.reject(err)
  }
}

const put = async (endpoint: string, data = {}, headers = {}) => {
  try {
    const req = await axios.put(endpoint, data, { headers })
    return Promise.resolve({ status: req.status, data: req.data })
  } catch (err) {
    logger(' ERROR::', err)
    return Promise.reject(err)
  }
}
// const del = async (endpoint: string, body = { data : {}, headers : {}}) => {
//   try {
//     const req = await axios.delete(endpoint, body)
//     return Promise.resolve({ status: req.status, data: req.data })
//   } catch (err) {
//     logger(' ERROR::', err)
//     return Promise.reject(err)
//   }
// }

export { get, post, put }
