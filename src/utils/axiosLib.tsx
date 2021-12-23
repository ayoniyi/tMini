import axios from 'axios'
import { logger } from './logger'

//const includeCredentials:boolean = false;

const post = async (endpoint: string, data = {}, headers = {}) => {
  try {
    const req = await axios.post(endpoint, data, { headers })
    return Promise.resolve({ status: req.status, data: req.data })
  } catch (err) {
    logger('POST ERROR::', err)
    return Promise.reject(err)
  }
}

export { post }
