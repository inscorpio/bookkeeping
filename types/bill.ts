import type { Bill } from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'
import type { z } from 'zod'
import type { billCreateSchema } from '~/schemas'
import type { CategoryClient, WalletAccountClient, WalletAccountServer } from '~/types'

// Fix a typing error in the amount field
// Because the Decimal type will be converted to string type in serialization.
// Then I rewrote the serialization method to convert it to a number type
// --------------> rewriteJSONStringify
export type BillCreate = z.infer<typeof billCreateSchema>
export type BillClient = Pick<Bill, 'id' | 'date' | 'note'> & { amount: number } & { category: CategoryClient } & { walletAccount: WalletAccountClient }
export type BillServer = Pick<Bill, 'id' | 'amount' | 'date' | 'note'> & { category: CategoryClient } & { walletAccount: WalletAccountServer }
export interface BillGroupByDateClient {
  date: string
  amount: number
  bills: Omit<BillClient, 'date' | 'walletAccount'>[]
}
export interface BillGroupByDateServer {
  date: string
  amount: Decimal
  bills: Omit<BillServer, 'date' | 'walletAccount'>[]
}
