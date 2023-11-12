import { z } from 'zod'

export const billCreateSchema = z.object({
  categoryId: z.number(),
  amount: z.number().positive('请检查金额是否正确'),
  date: z.coerce.date(),
  note: z.string().nullable(),
})
