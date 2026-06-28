import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { storage } from '@/utils/storage'
import type { ApiError } from '@/types'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const parseApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>
    return {
      message: axiosError.response?.data?.message ?? axiosError.message ?? 'Request failed',
      status: axiosError.response?.status,
    }
  }
  if (error instanceof Error) return { message: error.message }
  return { message: 'Unknown error' }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const parsed = parseApiError(error)
    if (parsed.status === 401) {
      storage.removeToken()
      window.location.href = '/login'
    }
    return Promise.reject(parsed)
  },
)
