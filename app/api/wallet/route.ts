import { type NextRequest, NextResponse } from 'next/server'
import prisma from '~/prisma/db'

export const walletAccountSelectField = {
  id: true,
  name: true,
  amount: true,
}

export async function GET(_: NextRequest) {
  const data = await prisma.walletAccount.findMany({
    select: walletAccountSelectField,
  })
  return NextResponse.json({ success: true, data }, { status: 200 })
}
