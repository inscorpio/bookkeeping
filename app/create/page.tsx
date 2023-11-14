import BillCreate from '~/app/create/_components/BillCreate'
import { RequestUrl } from '~/types'
import { request } from '~/utils'

export default async function CreatePage() {
  const categories = await request.get(RequestUrl.category) ?? []
  const walletAccounts = await request.get(RequestUrl.wallet) ?? []
  return (
    <BillCreate categories={categories} walletAccounts={walletAccounts} />
  )
}
