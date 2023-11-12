import { z } from 'zod'

function getWalletAccountSchema<T extends boolean>(isForm: T) {
  return z.object({
    name: z.string({ required_error: '账户名称不能为空' }).min(1, '账户名称不能为空').max(50, '账户名称不能超过 50 个字符'),
    amount: (isForm ? z.string() : z.number()) as T extends true ? z.ZodString : z.ZodNumber,
  })
}

export const walletAccountFormSchema = getWalletAccountSchema(true)
export const walletAccountSchema = getWalletAccountSchema(false)
