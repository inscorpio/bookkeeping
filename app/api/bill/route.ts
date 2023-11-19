import { type NextRequest, NextResponse } from 'next/server'
import { walletAccountSelectField } from '~/actions/WalletAccount'
import { categorySelectField } from '~/actions/Category'
import { catchError } from '~/utils'
import prisma from '~/prisma/db'
import { billCreateSchema } from '~/schemas'
import type { BillCreate, BillServer } from '~/types'

async function updateWalletAccout(bill: BillCreate) {
  const walletAccount = await prisma.walletAccount.findUnique({
    where: {
      id: bill.walletAccountId,
    },
    select: walletAccountSelectField,
  })

  if (walletAccount) {
    await prisma.walletAccount.update({
      where: {
        id: bill.walletAccountId,
      },
      data: {
        amount: walletAccount.amount.minus(bill.amount),
      },
    })
  }
  else {
    return NextResponse.json({ message: '钱包账户不存在' }, { status: 404 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const bill: BillCreate = await request.json()
    const validation = billCreateSchema.safeParse(bill)
    if (!validation.success) {
      return NextResponse.json({ message: '参数错误', errors: validation.error.issues }, { status: 400 })
    }

    const res = await updateWalletAccout(bill)

    if (res) return res

    const data: BillServer = await prisma.bill.create({
      data: bill,
      select: {
        id: true,
        date: true,
        amount: true,
        note: true,
        category: {
          select: categorySelectField,
        },
        walletAccount: {
          select: walletAccountSelectField,
        },
      },
    })
    return NextResponse.json({ success: true, message: '创建成功', data }, { status: 201 })
  }
  catch (error) {
    return catchError(error, { module: '账单' })
  }
}
