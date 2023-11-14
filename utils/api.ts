import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse } from 'next/server'

export function catchError(error: unknown, { module }: { module: string }) {
  const PrismaClientKnownRequestError = error as PrismaClientKnownRequestError
  if (PrismaClientKnownRequestError.code === 'P2002')
    return NextResponse.json({ success: false, message: `该${module}已存在` }, { status: 409 })

  if (error?.toString() === 'SyntaxError: Unexpected end of JSON input')
    return NextResponse.json({ success: false, message: '解析请求体失败' }, { status: 400 })

  return NextResponse.json({ success: false, message: '未知错误' }, { status: 500 })
}
