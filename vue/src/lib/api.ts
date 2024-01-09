import { initCsrf } from '@/stores/auth'
import Axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const api = Axios.create({
  baseURL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  withXSRFToken: true
})

api.interceptors.request.use(
  async (config) => {
    if (config.method !== 'get') {
      await initCsrf()
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export {
  Axios,
  baseURL
}

export default api