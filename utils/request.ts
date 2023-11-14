import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { toast } from '~/components/ui/use-toast'
import type { RequestMethod, RequestModule, RequestUrl, ResponseData, ResponseDataUnknownServiceData } from '~/types'
import { showZodErrorToasts } from '~/utils'

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
instance.interceptors.response.use(async (response) => {
  await handleServerResponse(response)
  return response
}, async (error: AxiosError<ResponseDataUnknownServiceData>) => {
  const { message, response } = error
  if (response) {
    await handleServerResponse(response)
  }
  else {
    toast({ title: message })
  }
  return Promise.reject(error)
})

async function handleServerResponse(response: AxiosResponse<ResponseDataUnknownServiceData>) {
  const { data } = response
  const { success, message } = data
  if (success) {
    toast({ title: message })
  }
  else {
    const { errors } = data
    await showZodErrorToasts(errors)
    return Promise.reject(response)
  }
}

interface Config<U extends RequestUrl, M extends RequestMethod> extends AxiosRequestConfig<RequestModule[U][M]['request']> {
  url: U
  method?: M
}

async function request<U extends RequestUrl, M extends RequestMethod = 'get'>(config: Config<U, M>) {
  const { data } = await instance.request<ResponseData<U, M>>(config)
  return data
}

request.get = async <U extends RequestUrl>(url: U, config?: Config<U, 'get'>) => {
  const { data } = await instance.get<ResponseData<U, 'get'>>(url, config)
  const { success } = data
  if (success) {
    const { data: serviceData } = data
    return serviceData
  }
}
request.post = async <U extends RequestUrl>(url: U, requestData?: RequestModule[U]['post']['request'], config?: Config<U, 'post'>) => {
  const { data } = await instance.post<ResponseData<U, 'post'>>(url, requestData, config)
  return data
}

export { request }
