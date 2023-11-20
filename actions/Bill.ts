import type { Decimal } from '@prisma/client/runtime/library'
import prisma from '~/prisma/db'
import type { BillGroupByDateServer } from '~/types'
import { categorySelectField } from '~/actions/Category'
import { getChineseDate } from '~/utils'

export async function fetchBillGroups() {
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
          equals: getChineseDate(date),
        },
      },
      orderBy: {
        id: 'desc',
      },
    })
    data.push({ date, amount, bills })
  }

  return data
}
