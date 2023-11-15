import { type NextRequest, NextResponse } from 'next/server'
import { subHours } from 'date-fns'
import type { Decimal } from '@prisma/client/runtime/library'
import { catchError } from '~/utils'
import prisma from '~/prisma/db'
import { billCreateSchema } from '~/schemas'
import type { BillCreate, BillGroupByDateServer, BillServer } from '~/types'
import { categorySelectField } from '~/app/api/category/route'
import { walletAccountSelectField } from '~/app/api/wallet/route'

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

export async function GET(_: NextRequest) {
  const groups: { date: string; amount: Decimal }[] = await prisma.$queryRaw`
    SELECT MAX(DATE_FORMAT(CONVERT_TZ(date, 'UTC', 'Asia/Shanghai'), '%Y-%m-%d')) AS date, SUM(amount) AS amount
    FROM Bill
    GROUP BY DATE(date)
    ORDER BY date DESC
  `
  const data: BillGroupByDateServer[] = []

  for (const { date, amount } of groups) {
    const bills = await prisma.bill.findMany({
      select: {
        id: true,
        amount: true,
        note: true,
        category: {
          select: categorySelectField,
        },
      },
      where: {
        date: {
          equals: subHours(new Date(date), 8),
        },
      },
      orderBy: {
        id: 'desc',
      },
    })
    data.push({ date, amount, bills })
  }
  return NextResponse.json({ success: true, data }, { status: 200 })
}
