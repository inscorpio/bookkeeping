import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '~/prisma/db'

const CategoryInputSchema = z.object({
  label: z.string({ required_error: '请输入分类名称' }).min(1, { message: '请输入分类名称' }).max(191, { message: '分类名称不能超过 191 位' }),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = CategoryInputSchema.safeParse(body)
    if (!validation.success)
      return NextResponse.json({ message: validation.error.formErrors.fieldErrors.label?.[0] }, { status: 400 })

    const data = await prisma.category.create({
      data: {
        label: body.label,
      },
      select: {
        id: true,
        label: true,
      },
    })
    return NextResponse.json({ message: '创建成功', data }, { status: 201 })
  }
  catch (error) {
    const PrismaClientKnownRequestError = error as PrismaClientKnownRequestError
    if (PrismaClientKnownRequestError.code === 'P2002')
      return NextResponse.json({ message: '该分类已存在' }, { status: 409 })

    if (error?.toString() === 'SyntaxError: Unexpected end of JSON input')
      return NextResponse.json({ message: '解析 ResponseBody 失败' }, { status: 400 })

    return NextResponse.json({ message: '未知错误', error }, { status: 500 })
  }
}

export async function GET(_: NextRequest) {
  const data = await prisma.category.findMany({
    select: {
      id: true,
      label: true,
    },
  })
  return NextResponse.json(data, { status: 200 })
}
