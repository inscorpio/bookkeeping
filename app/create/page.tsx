import { requestCategoryList } from '~/api/category'
import BillCreate from '~/app/create/_components/BillCreate'

export default async function CreatePage() {
  const { data: categories } = await requestCategoryList()
  return (
    <BillCreate categories={categories} />
  )
}
