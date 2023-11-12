import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export function catchError(error: unknown, { module }: { module: string }) {
  const PrismaClientKnownRequestError = error as PrismaClientKnownRequestError
  if (PrismaClientKnownRequestError.code === 'P2002')
    return { success: false, message: `该${module}已存在` }

  if (error?.toString() === 'SyntaxError: Unexpected end of JSON input')
    return { success: false, message: '解析 ResponseBody 失败' }

  return { success: false, message: '未知错误' }
}
