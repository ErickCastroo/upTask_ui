import axios from 'axios'

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tokenUptask')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
)

export { Api }