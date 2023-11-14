import BillCreate from '~/app/create/_components/BillCreate'
import { RequestUrl } from '~/types'
import { request } from '~/utils'

export default async function CreatePage() {
  const categories = await request.get(RequestUrl.category) ?? []
  return (
    <BillCreate categories={categories} />
  )
}
