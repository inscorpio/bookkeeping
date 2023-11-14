'use server'
import { subHours } from 'date-fns'
import type { BillClient } from '~/types'
import prisma from '~/prisma/db'
import { categorySelectField } from '~/app/api/category/route'

export async function requestBillsGroupByDate() {
  const groups: { date: string; amount: number }[] = await prisma.$queryRaw`
    SELECT MAX(DATE_FORMAT(CONVERT_TZ(date, 'UTC', 'Asia/Shanghai'), '%Y-%m-%d')) AS date, SUM(amount) AS amount
    FROM Bill
    GROUP BY DATE(date)
    ORDER BY date DESC
  `
  const data: {
    date: string
    amount: number
    bills: Omit<BillClient, 'date' | 'walletAccount'>[]
  }[] = []

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

  return { data }
}
