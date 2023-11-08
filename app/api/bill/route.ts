import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '~/prisma/db'

const billSchema = z.object({
  categoryId: z.number(),
  amount: z.number(),
  date: z.coerce.date(),
})

export async function POST(req: NextRequest) {
  const body: z.infer<typeof billSchema> = await req.json()
  const validation = billSchema.safeParse(body)
  if (!validation.success)
    return NextResponse.json({ message: '参数错误', error: validation.error.format() }, { status: 400 })
  console.log(body.amount)

  const data = await prisma.bill.create({
    data: {
      categoryId: body.categoryId,
      amount: body.amount,
      date: body.date,
    },
  })
  return NextResponse.json({ message: '创建成功', data }, { status: 201 })
}

export async function GET(_: NextRequest) {
  const groups: { date: string }[] = await prisma.$queryRaw`
    SELECT MAX(DATE_FORMAT(date, '%Y-%m-%d')) AS date
    FROM Bill
    GROUP BY DATE(date)
    ORDER BY date DESC
  `
  const data = []
  for (const { date } of groups) {
    const bills = await prisma.$queryRaw`
      SELECT Bill.id, Bill.amount, JSON_OBJECT('id', Category.id, 'label', Category.label) AS category
      FROM Bill
      INNER JOIN Category ON Bill.categoryId = Category.id
      WHERE DATE(date) = ${date}
    `
    data.push({ date, bills })
  }

  return NextResponse.json({ data })
}
