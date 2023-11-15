import type { z } from 'zod'
import type {
  BillCreate,
  BillGroupByDateClient,
  CategoryClient,
  CategoryCreate,
  WalletAccountClient,
  WalletAccountCreate,
  WalletAccountExpenditureClient,
} from '~/types'

export enum RequestUrl {
  wallet = '/wallet',
  category = '/category',
  bill = '/bill',
  walletExpenditure = '/wallet/expenditure',
}

export type RequestMethod = 'get' | 'post' | undefined

export interface RequestModule {
  [RequestUrl.wallet]: {
    get: {
      response: WalletAccountClient[]
    }
    post: {
      request: WalletAccountCreate
    }
  }
  [RequestUrl.category]: {
    get: {
      response: CategoryClient[]
    }
    post: {
      request: CategoryCreate
    }
  }
  [RequestUrl.bill]: {
    get: {
      response: BillGroupByDateClient[]
    }
    post: {
      request: BillCreate
    }
  }
  [RequestUrl.walletExpenditure]: {
    get: {
      response: WalletAccountExpenditureClient[]
    }
  }
}

interface ResponseSuccessUnknownData<T = unknown> {
  success: true
  message: string
  data: T
}

interface ResponseSuccess<U extends RequestUrl, M extends RequestMethod> {
  success: true
  message: string
  data: M extends undefined
    ? RequestModule[U]['get']['response']
    : M extends keyof RequestModule[U]
      ? 'response' extends keyof RequestModule[U][M]
        ? RequestModule[U][M]['response']
        : unknown
      : unknown
}

interface ResponseError {
  success: false
  message: string
  error?: unknown
  errors?: z.ZodIssue[]
}

export type ResponseData<U extends RequestUrl, M extends RequestMethod> = ResponseSuccess<U, M> | ResponseError
export type ResponseDataUnknownServiceData<T = unknown> = ResponseSuccessUnknownData<T> | ResponseError
