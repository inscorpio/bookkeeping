import { addDays, setMonth, startOfDay } from 'date-fns'
import prisma from '~/prisma/db'
import type { WalletAccountExpenditureServer } from '~/types'

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

async function fetchThisMonthExpend(walletAccountId: number) {
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
