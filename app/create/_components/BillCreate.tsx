'use client'
import { startOfDay } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { requestBillCreate } from '~/api/bill'
import type { CategoryClient } from '~/api/category'
import ActionBar from '~/app/create/_components/ActionBar'
import CategoryList from '~/app/create/_components/CategoryList'
import KeyBoard from '~/app/create/_components/KeyBoard'
import { Input } from '~/components/ui/input'
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
      <main className="flex flex-col w-full h-full pt-4 bg-stone-100">
        <nav className="px-3">
          <Link href="/">
            <IoIosArrowBack size="1.5em" />
          </Link>
        </nav>
        <div className="flex-1">
          <CategoryList
            categories={categories}
            selectIndex={selectIndex}
            onSelect={i => setSelectIndex(i)}
          />
        </div>
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
      </main>

    </>
  )
}
