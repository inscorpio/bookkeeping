'use server'
import type { Bill } from '@prisma/client'
import { subHours } from 'date-fns'
import type { z } from 'zod'
import type { CategoryClient } from '~/types'
import prisma from '~/prisma/db'
import { billCreateSchema } from '~/schemas'

export type BillCreate = z.infer<typeof billCreateSchema>
export type BillClient = Pick<Bill, 'id' | 'amount' | 'date' | 'note'> & { category: CategoryClient }

export async function requestBillCreate(bill: BillCreate) {
  const validation = billCreateSchema.safeParse(bill)
  if (!validation.success) {
    return {
      message: '参数错误',
      errors: validation.error.errors,
    }
  }
  await prisma.bill.create({
    data: bill,
  })

  return {
    message: '创建成功',
  }
}

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
    bills: Omit<BillClient, 'date'>[]
  }[] = []

  for (const { date, amount } of groups) {
    const bills = await prisma.bill.findMany({
      select: {
        id: true,
        amount: true,
        note: true,
        category: {
          select: {
            id: true,
            label: true,
          },
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
