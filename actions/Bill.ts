import { Decimal } from '@prisma/client/runtime/library'
import prisma from '~/prisma/db'
import type { BillGroupByDateServer } from '~/types'
import { categorySelectField } from '~/actions/Category'
import { getChineseDate } from '~/utils'

export async function fetchBillGroups() {
  const groups = await prisma.bill.groupBy({
    by: 'date',
    _sum: { amount: true },
    orderBy: { date: 'desc' },
  })
  const data: BillGroupByDateServer[] = []

  for (const { date, _sum: { amount } } of groups) {
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
          equals: date,
        },
      },
      orderBy: {
        id: 'desc',
      },
    })
    data.push({ date, amount: amount ?? new Decimal(0), bills })
  }

  return data
}
