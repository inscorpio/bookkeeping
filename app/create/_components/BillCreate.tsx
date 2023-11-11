'use client'
import { startOfDay } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { requestBillCreate } from '~/api/bill'
import type { CategoryClient } from '~/api/category'
import ActionBar from '~/app/create/_components/ActionBar'
import CategoryList from '~/app/create/_components/CategoryList'
import KeyBoard from '~/app/create/_components/KeyBoard'
import BackToHome from '~/components/BackToHome'
import { Input } from '~/components/ui/input'
import { Container, Footer, Header, Main } from '~/components/ui/layout'
import { useToast } from '~/components/ui/use-toast'

export default function BillCreate({ categories }: { categories: CategoryClient[] }) {
  const [date, setDate] = useState<Date | undefined>(startOfDay(new Date()))
  const [amount, setAmount] = useState('0')
  const [selectIndex, setSelectIndex] = useState(0)
  const [note, setNote] = useState('')
  const { toast } = useToast()
  const router = useRouter()
  const handleSave = async () => {
    const { message, errors } = await requestBillCreate({
      categoryId: categories[selectIndex].id,
      amount: +amount,
      date: date!,
      note,
    })

    if (errors) {
      errors.forEach((e) => {
        toast({
          title: e.message,
        })
      })
    }
    else {
      toast({
        title: message,
      })
      router.push('/')
    }
  }
  return (
    <>
      <Container className="bg-stone-100">
        <Header>
          <BackToHome />
        </Header>
        <Main className="p-0">
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
