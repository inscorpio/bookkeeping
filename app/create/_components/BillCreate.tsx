'use client'
import type { Category } from '@prisma/client'
import Link from 'next/link'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import ActionBar from '~/app/create/_components/ActionBar'
import CategoryList from '~/app/create/_components/CategoryList'
import KeyBoard from '~/app/create/_components/KeyBoard'
import { RequestModule, request } from '~/utils'

export default function BillCreate({ categories }: { categories: Category[] }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [amount, setAmount] = useState('0')
  const [selectIndex, setSelectIndex] = useState(0)
  const handleSave = async () => {
    console.log(date)
    await request(
      RequestModule.bill,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: categories[selectIndex].id,
          date,
          amount: +amount,
        }),
      },
    )
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
