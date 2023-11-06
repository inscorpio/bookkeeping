'use client'
import { AiOutlineSetting } from 'react-icons/ai'
import clsx from 'clsx'
import { useState } from 'react'

export interface CategoryItem {
  id: number
  label: string
  icon: string
}

interface Props {
  list: CategoryItem[]
  onSelectItem: (id: number) => void
}

export default function Category({ list, onSelectItem: onSelect }: Props) {
  const [selectIndex, setSelectIndex] = useState(0)
  const itemClassName = (i?: number) => clsx(
    'flex justify-center items-center p-4 rounded-lg',
    i === selectIndex ? 'bg-stone-900 text-stone-50' : 'bg-white',
  )
  const handleSelect = (item: CategoryItem, i: number) => {
    setSelectIndex(i)
    onSelect(item.id)
  }
  return (
    <div className="flex-1">
      <ul className="grid grid-cols-4 gap-4 m-4">
        {
        list.map((v, i) => {
          return (
            <li
              key={v.id}
              className={itemClassName(i)}
              onClick={() => handleSelect(v, i)}
            >
              {v.label}
            </li>
          )
        })
      }
        <li key="setting" className={itemClassName()}>
          <AiOutlineSetting size="2em" />
        </li>
      </ul>
    </div>
  )
}
