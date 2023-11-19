import { type NextRequest, NextResponse } from 'next/server'
import prisma from '~/prisma/db'
import type { WalletAccountCreate } from '~/types'
import { walletAccountSchema } from '~/schemas'
import { catchError } from '~/utils'

export async function POST(request: NextRequest) {
  try {
    const wallet: WalletAccountCreate = await request.json()
    const validation = walletAccountSchema.safeParse(wallet)
    if (!validation.success) {
      return NextResponse.json({ message: '参数错误', errors: validation.error.issues }, { status: 400 })
    }

    const data = await prisma.walletAccount.create({
      data: wallet,
    })
    return NextResponse.json({ success: true, message: '创建成功', data }, { status: 201 })
  }
  catch (error) {
    return catchError(error, { module: '账户' })
  }
}
