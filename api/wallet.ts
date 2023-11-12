'use server'
import type { z } from 'zod'
import { catchError } from '~/api/common'
import prisma from '~/prisma/db'
import { walletAccountSchema } from '~/schemas'

type WalletAccountCreate = z.infer<typeof walletAccountSchema>

export async function requestWalletAccountCreate(wallet: WalletAccountCreate) {
  const validation = walletAccountSchema.safeParse(wallet)
  if (!validation.success) {
    return {
      success: false,
      message: '参数错误',
      errors: validation.error.errors,
    }
  }
  try {
    await prisma.walletAccount.create({
      data: wallet,
    })
    return {
      success: true,
      message: '创建成功',
    }
  }
  catch (error) {
    return catchError(error, { module: '账户' })
  }
}
