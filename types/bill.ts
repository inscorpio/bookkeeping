import type { Bill } from '@prisma/client'
import type { z } from 'zod'
import type { billCreateSchema } from '~/schemas'
import type { CategoryClient, WalletAccountClient, WalletAccountServer } from '~/types'

export type BillCreate = z.infer<typeof billCreateSchema>
export type BillClient = Pick<Bill, 'id' | 'amount' | 'date' | 'note'> & { category: CategoryClient } & { walletAccount: WalletAccountClient }
export type BillServer = Pick<Bill, 'id' | 'amount' | 'date' | 'note'> & { category: CategoryClient } & { walletAccount: WalletAccountServer }
