'use client'
import { useEffect, useState } from 'react'
import type { CategoryItem as ICategoryItem } from '~/app/create/Category'
import Category from '~/app/create/Category'
import KeyboardInput from '~/app/create/KeyboardInput'
import Nav from '~/app/create/Nav'

export default function BillCreatePage() {
  const [categories, setCategories] = useState<ICategoryItem[]>([])
  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/category')
      const { data } = await res.json()
      const categories = data as ICategoryItem[]
      setCategories(categories)
    })()
  }, [])
  let categoryId = categories[0]?.id
  let date = new Date()
  function handleSelect(id: number): void {
    categoryId = id
  }
  const handleSelectDate = (selectDate: Date): void => {
    date = selectDate
  }
  const handleSave = async (amount: number) => {
    await fetch(
      'http://localhost:3000/api/bill',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId,
          date,
          amount,
          note: '',
        }),
      },
    )
  }

  return (
    <div className="flex flex-col w-full h-full pt-4 bg-stone-100">
      <Nav />
      <Category
        list={categories}
        onSelectItem={handleSelect}
      />
      <KeyboardInput
        onSave={handleSave}
        onSelectDate={handleSelectDate}
      />
    </div>
  )
}
