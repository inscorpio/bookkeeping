'use server'
import type { Bill } from '@prisma/client'
import { subHours } from 'date-fns'
import { z } from 'zod'
import type { CategoryClient } from '~/api/category'
import prisma from '~/prisma/db'

const billCreateSchema = z.object({
  categoryId: z.number(),
  amount: z.number().positive('请检查金额是否正确'),
  date: z.coerce.date(),
  note: z.string().nullable(),
})

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
  const groups: { date: string }[] = await prisma.$queryRaw`
    SELECT MAX(DATE_FORMAT(CONVERT_TZ(date, 'UTC', 'Asia/Shanghai'), '%Y-%m-%d')) AS date
    FROM Bill
    GROUP BY DATE(date)
    ORDER BY date DESC
  `
  const data: {
    date: string
    bills: Omit<BillClient, 'date'>[]
  }[] = []

  for (const { date } of groups) {
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
        // 大于等于今天
        date: {
          equals: subHours(new Date(date), 8),
        },
      },
      orderBy: {
        id: 'desc',
      },
    })
    data.push({ date, bills })
  }

  return { data }
}
