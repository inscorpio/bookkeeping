import type { WalletAccount } from '@prisma/client'
import type { z } from 'zod'
import type { walletAccountFormSchema } from '~/schemas'

// Fix a typing error in the amount field
// Because the Decimal type will be converted to string type in serialization.
// Then I rewrote the serialization method to convert it to a number type
// --------------> rewriteJSONStringify
export type WalletAccountCreate = z.infer<typeof walletAccountFormSchema>
export type WalletAccountClient = Pick<WalletAccount, 'id' | 'name'> & { amount: number }
export type WalletAccountServer = Pick<WalletAccount, 'id' | 'name' | 'amount'>
export type WalletAccountExpenditureServer = (WalletAccountServer & { todayExpenditure: number; monthlyExpenditure: number })
export type WalletAccountExpenditureClient = (WalletAccountClient & { todayExpenditure: number; monthlyExpenditure: number })
