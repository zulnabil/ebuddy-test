import axios from "axios"
import { cookies } from "next/headers"

export const instance = axios.create({
  baseURL: process.env.BASE_CLIENT_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})

export const fetchMyProfile = async () => {
  try {
    const response = await instance.get("/api/profile")
    return response.data
  } catch (error: any) {
    return handleAxiosError(error)
  }
}

// Add a request interceptor to inject the token into the config cookies
instance.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      // We're on the server, use next/headers
      const cookieStore = cookies()
      const token = cookieStore.get("token")?.value

      if (token) {
        config.headers.Cookie = `token=${token}`
      }
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const handleAxiosError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    return error.response.data
  } else if (error.request) {
    // The request was made but no response was received
    return error.request
  } else {
    // Something happened in setting up the request that triggered an Error
    return error.message
  }
}
