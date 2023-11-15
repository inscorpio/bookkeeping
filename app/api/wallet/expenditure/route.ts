import { addDays, setMonth, startOfDay } from 'date-fns'
import { type NextRequest, NextResponse } from 'next/server'
import { walletAccountSelectField } from '~/app/api/wallet/route'
import prisma from '~/prisma/db'
import type { WalletAccountExpenditureServer } from '~/types'

export async function GET(_: NextRequest) {
  const walletAccounts = await prisma.walletAccount.findMany({
    select: walletAccountSelectField,
  })

  const data: WalletAccountExpenditureServer[] = []

  for (let i = 0; i < walletAccounts.length; i++) {
    const walletAccount = walletAccounts[i]

    const todayExpenditure = await getTodayExpend(walletAccount.id)
    const monthlyExpenditure = await getThisMonthExpend(walletAccount.id)

    data.push({
      ...walletAccount,
      todayExpenditure,
      monthlyExpenditure,
    })
  }
  return NextResponse.json({ success: true, data }, { status: 200 })
}

async function getTodayExpend(walletAccountId: number) {
  const today = startOfDay(new Date())

  const tomorrow = startOfDay(addDays(new Date(), 1))

  const res = await prisma.bill.aggregate({
    where: {
      walletAccountId,
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
    _sum: {
      amount: true,
    },
  })

  return res._sum.amount?.toNumber() ?? 0
}

async function getThisMonthExpend(walletAccountId: number) {
  const today = startOfDay(new Date())
  const firstDayOfMonth = setMonth(today, today.getMonth() - 1)

  const lastDayOfMonth = setMonth(today, today.getMonth() + 1)

  const res = await prisma.bill.aggregate({
    where: {
      walletAccountId,
      date: {
        gte: firstDayOfMonth,
        lt: lastDayOfMonth,
      },
    },
    _sum: {
      amount: true,
    },
  })

  return res._sum.amount?.toNumber() ?? 0
}
