import { initCsrf } from '@/stores/auth'
import Axios from 'axios'

const apiBaseURL = import.meta.env.VITE_API_URL

const api = Axios.create({
  baseURL: apiBaseURL,
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
  apiBaseURL
}

export default api