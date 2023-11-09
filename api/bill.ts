'use server'
import { z } from 'zod'
import prisma from '~/prisma/db'

const billCreateSchema = z.object({
  categoryId: z.number(),
  amount: z.number(),
  date: z.coerce.date(),
})

export type BillCreate = z.infer<typeof billCreateSchema>

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
