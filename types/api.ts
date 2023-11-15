import type { z } from 'zod'
import type { BillCreate, BillGroupByDateClient, CategoryClient, CategoryCreate, WalletAccountClient, WalletAccountCreate } from '~/types'

export enum RequestUrl {
  wallet = '/wallet',
  category = '/category',
  bill = '/bill',
}

export type RequestMethod = 'get' | 'post'

export interface RequestModule {
  [RequestUrl.wallet]: {
    get: {
      request: undefined
      response: WalletAccountClient[]
    }
    post: {
      request: WalletAccountCreate
      response: unknown
    }
  }
  [RequestUrl.category]: {
    get: {
      request: undefined
      response: CategoryClient[]
    }
    post: {
      request: CategoryCreate
      response: unknown
    }
  }
  [RequestUrl.bill]: {
    get: {
      request: unknown
      response: BillGroupByDateClient[]
    }
    post: {
      request: BillCreate
      response: unknown
    }
  }
}

interface ResponseSuccessUnknownData<T = unknown> {
  success: true
  message: string
  data: T
}

interface ResponseSuccess<U extends RequestUrl, M extends RequestMethod | undefined> {
  success: true
  message: string
  data: M extends RequestMethod ? RequestModule[U][M]['response'] : RequestModule[U]['get']['response']
}

interface ResponseError {
  success: false
  message: string
  error?: unknown
  errors?: z.ZodIssue[]
}

export type ResponseData<U extends RequestUrl, M extends RequestMethod | undefined> = ResponseSuccess<U, M> | ResponseError
export type ResponseDataUnknownServiceData<T = unknown> = ResponseSuccessUnknownData<T> | ResponseError
