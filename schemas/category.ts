import { z } from 'zod'

export const categorySchema = z.object({
  label: z.string({ required_error: '请输入分类名称' }).min(1, { message: '请输入分类名称' }).max(4, { message: '分类名称不能超过 4 位' }),
})
