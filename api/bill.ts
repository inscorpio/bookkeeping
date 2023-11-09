'use server'
import type { Bill } from '@prisma/client'
import { z } from 'zod'
import type { CategoryClient } from '~/api/category'
import prisma from '~/prisma/db'

const billCreateSchema = z.object({
  categoryId: z.number(),
  amount: z.number(),
  date: z.coerce.date(),
})

export type BillCreate = z.infer<typeof billCreateSchema>
export type BillClient = Pick<Bill, 'id' | 'amount' | 'date'> & { category: CategoryClient }

export async function requestBillCreate(bill: BillCreate) {
  const validation = billCreateSchema.safeParse(bill)
  if (!validation.success)
    return {
      message: '参数错误',
      error: validation.error.format(),
    }
  const data = await prisma.bill.create({
    data: bill,
  })
  return {
    message: '创建成功',
    data,
  }
}

export async function requestBillsGroupByDate() {
  const groups: { date: string }[] = await prisma.$queryRaw`
    SELECT MAX(DATE_FORMAT(date, '%Y-%m-%d')) AS date
    FROM Bill
    GROUP BY DATE(date)
    ORDER BY date DESC
  `
  const data = []
  for (const { date } of groups) {
    const bills: Omit<BillClient, 'date'>[] = await prisma.$queryRaw`
      SELECT Bill.id, Bill.amount, JSON_OBJECT('id', Category.id, 'label', Category.label) AS category
      FROM Bill
      INNER JOIN Category ON Bill.categoryId = Category.id
      WHERE DATE(date) = ${date}
    `
    data.push({ date, bills })
  }

  return { data }
}
