import type { WalletAccount } from '@prisma/client'

// Fix a typing error in the amount field
// Because the Decimal type will be converted to string type in serialization.
// Then I rewrote the serialization method to convert it to a numeric type
// --------------> rewriteJSONStringify
export type WalletAccountClient = Pick<WalletAccount, 'id' | 'name'> & { amount: number }

export enum RequestModule {
  wallet = '/wallet',
}

export interface RequestGetDataMap {
  [RequestModule.wallet]: undefined
}

export interface ResponseGetDataMap {
  [RequestModule.wallet]: WalletAccountClient[]
}
