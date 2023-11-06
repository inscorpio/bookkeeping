import type { Bill } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'
import prisma from '~/prisma/db'

export async function POST(req: NextRequest) {
  const { amount, categoryId, date, note }: Bill = await req.json()
  const data = await prisma.bill.create({
    data: {
      categoryId,
      amount,
      date,
      note,
    },
  })
  return NextResponse.json({ data })
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
