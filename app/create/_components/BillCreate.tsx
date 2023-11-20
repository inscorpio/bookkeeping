'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { RequestUrl } from '~/types'
import type { CategoryClient, WalletAccountClient } from '~/types'
import ActionBar from '~/app/create/_components/ActionBar'
import CategoryList from '~/app/create/_components/CategoryList'
import KeyBoard from '~/app/create/_components/KeyBoard'
import BackTo from '~/components/BackTo'
import { Input } from '~/components/ui/input'
import { Container, Footer, Header, Main } from '~/components/ui/layout'
import { getStartOfToday, request } from '~/utils'

export default function BillCreate({ categories, walletAccounts }: { categories: CategoryClient[]; walletAccounts: WalletAccountClient[] }) {
  let walletAccountId = walletAccounts[0]?.id
  const [date, setDate] = useState<Date | undefined>(getStartOfToday())
  const [amount, setAmount] = useState('0')
  const [selectIndex, setSelectIndex] = useState(0)
  const [note, setNote] = useState('')
  const router = useRouter()
  const handleSave = async () => {
    await request.post(RequestUrl.bill, {
      categoryId: categories[selectIndex]?.id,
      walletAccountId,
      amount: +amount,
      date: date!,
      note,
    })
    router.push('/')
  }
  return (
    <>
      <Container className="bg-stone-100">
        <Header>
          <BackTo />
        </Header>
        <Main className="px-6">
          <CategoryList
            categories={categories}
            selectIndex={selectIndex}
            onSelect={i => setSelectIndex(i)}
          />
        </Main>
        <Footer>
          <Input
            className="bg-white border-none rounded-none mb-2"
            placeholder="请输入"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <ActionBar
            date={date}
            amount={amount}
            onSelect={setDate}
            walletAccounts={walletAccounts}
            onWalletChange={id => walletAccountId = id}
          />
          <KeyBoard
            value={amount}
            onInput={setAmount}
            onSave={handleSave}
          />
        </Footer>
      </Container>
    </>
  )
}
