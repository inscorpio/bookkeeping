import { type NextRequest, NextResponse } from 'next/server'
import prisma from '~/prisma/db'

export async function POST(req: NextRequest) {
  const { amount, categoryId, date, note } = await req.json() as any
  const bill = await prisma.bill.create({
    data: {
      categoryId,
      amount,
      date,
      note,
    },
  })
  return NextResponse.json({ data: bill })
}
