import type { Category } from '@prisma/client'
import BillCreate from '~/app/create/_components/BillCreate'
import { RequestModule, request } from '~/utils'

export default async function CreatePage() {
  const categories = await request<Category[]>(RequestModule.category)
  return (
    <BillCreate categories={categories} />
  )
}
