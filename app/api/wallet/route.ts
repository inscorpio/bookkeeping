import { type NextRequest, NextResponse } from 'next/server'
import prisma from '~/prisma/db'

export async function GET(_: NextRequest) {
  const data = await prisma.walletAccount.findMany({
    select: {
      id: true,
      name: true,
      amount: true,
    },
  })
  return NextResponse.json({ success: true, data }, { status: 200 })
}
