import { type NextRequest, NextResponse } from 'next/server'
import prisma from '~/prisma/db'

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
