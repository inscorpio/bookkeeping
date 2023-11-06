import { type NextRequest, NextResponse } from 'next/server'
import prisma from '~/prisma/db'

export async function GET(_: NextRequest) {
  const categories = await prisma.category.findMany()
  return NextResponse.json({ data: categories })
}
