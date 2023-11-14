import { type NextRequest, NextResponse } from 'next/server'
import { catchError } from '~/utils'
import prisma from '~/prisma/db'
import { categorySchema } from '~/schemas'
import type { CategoryClient } from '~/types'

export async function GET(_: NextRequest) {
  const data: CategoryClient[] = await prisma.category.findMany({
    select: {
      id: true,
      label: true,
    },
  })
  return NextResponse.json({ success: true, data }, { status: 200 })
}

export async function POST(request: NextRequest) {
  try {
    const category = await request.json()
    const validation = categorySchema.safeParse(category)
    if (!validation.success) {
      return NextResponse.json({ message: '参数错误', errors: validation.error.issues }, { status: 400 })
    }

    const data: CategoryClient = await prisma.category.create({
      data: category,
      select: {
        id: true,
        label: true,
      },
    })
    return NextResponse.json({ success: true, message: '创建成功', data }, { status: 201 })
  }
  catch (error) {
    return catchError(error, { module: '分类' })
  }
}
