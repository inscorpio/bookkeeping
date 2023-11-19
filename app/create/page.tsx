import BillCreate from '~/app/create/_components/BillCreate'
import prisma from '~/prisma/db'

export default async function CreatePage() {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  const walletAccounts = await prisma.walletAccount.findMany()
  return (
    <BillCreate categories={categories} walletAccounts={walletAccounts} />
  )
}
