import type { z } from 'zod'
import type { Category } from '@prisma/client'
import type { categorySchema } from '~/schemas'

export type CategoryClient = Pick<Category, 'id' | 'label'>
export type CategoryCreate = z.infer<typeof categorySchema>
