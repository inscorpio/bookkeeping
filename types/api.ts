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

export type RequestMethod = 'get' | 'post'

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

type ModuleData<U, M, R> = U extends keyof RequestModule
  ? M extends keyof RequestModule[U]
    ? R extends keyof RequestModule[U][M]
      ? RequestModule[U][M][R]
      : never
    : never
  : never

export type RequestData<U, M> = ModuleData<U, M, 'request'>
export type ResultData<U, M> = ModuleData<U, M, 'response'>

interface ResponseSuccessUnknownData<T = unknown> {
  success: true
  message: string
  data: T
}

interface ResponseSuccess<U, M> {
  success: true
  message: string
  data: ResultData<U, M>
}

interface ResponseError {
  success: false
  message: string
  error?: unknown
  errors?: z.ZodIssue[]
}

export type ResponseData<U, M> = ResponseSuccess<U, M> | ResponseError
export type ResponseDataUnknownServiceData<T = unknown> = ResponseSuccessUnknownData<T> | ResponseError
