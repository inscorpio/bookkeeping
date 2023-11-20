import { addDays, lastDayOfMonth, startOfDay, startOfMonth } from 'date-fns'
import prisma from '~/prisma/db'
import type { WalletAccountExpenditureServer } from '~/types'
import { getChineseDate, getStartOfToday } from '~/utils'

export const walletAccountSelectField = {
  id: true,
  name: true,
  amount: true,
}

export async function fetchWalletAccounts() {
  const walletAccounts = await prisma.walletAccount.findMany({
    select: walletAccountSelectField,
  })

  const data: WalletAccountExpenditureServer[] = []

  for (let i = 0; i < walletAccounts.length; i++) {
    const walletAccount = walletAccounts[i]

    const todayExpenditure = await fetchTodayExpend(walletAccount.id)
    const monthlyExpenditure = await fetchThisMonthExpend(walletAccount.id)

    data.push({
      ...walletAccount,
      todayExpenditure,
      monthlyExpenditure,
    })
  }
  return data
}

async function fetchTodayExpend(walletAccountId: number) {
  const today = startOfDay(new Date())
  const tomorrow = addDays(today, 1)

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

async function fetchThisMonthExpend(walletAccountId: number) {
  const now = new Date()
  const firstDay = startOfMonth(now)
  const lastDay = lastDayOfMonth(now)

  const res = await prisma.bill.aggregate({
    where: {
      walletAccountId,
      date: {
        gte: firstDay,
        lt: lastDay,
      },
    },
    _sum: {
      amount: true,
    },
  })

  return res._sum.amount?.toNumber() ?? 0
}
