import BillCreate from '~/app/create/_components/BillCreate'
import prisma from '~/prisma/db'

export const dynamic = 'force-dynamic'

export default async function CreatePage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  const serverWalletAccounts = await prisma.walletAccount.findMany()
  const walletAccounts = serverWalletAccounts.map(v => ({ ...v, amount: v.amount.toNumber() }))

  return (
    <BillCreate categories={categories} walletAccounts={walletAccounts} />
  )
}
