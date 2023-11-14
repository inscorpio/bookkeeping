import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { RequestGetDataMap, RequestModule, ResponseGetDataMap } from '~/types'

export interface ResponseData<T = unknown> {
  success: boolean
  data: T
}

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

interface AxiosRequestConfigWithUrl<T> extends AxiosRequestConfig<T> {
  url: RequestModule
}

async function request<Module extends RequestModule>(config: AxiosRequestConfigWithUrl<RequestGetDataMap[Module]>) {
  const { data } = await instance.request<ResponseData<ResponseGetDataMap[Module]>>(config)
  return data
}

request.get = async <Module extends RequestModule>(url: Module, config?: AxiosRequestConfig<RequestGetDataMap[Module]>) => {
  const { data } = await instance.get<ResponseData<ResponseGetDataMap[Module]>>(url, config)
  return data
}

export { request }
