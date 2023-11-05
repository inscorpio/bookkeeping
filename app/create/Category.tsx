import { useState } from 'react'
import { AiOutlineSetting } from 'react-icons/ai'
import { normalizeClassName } from '~/utils'

export interface CategoryItem {
  id: number
  label: string
  icon: string
  select: boolean
}

interface Props {
  onSelect: (id: number) => void
}

export default function Category({ onSelect }: Props) {
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: 1,
      label: '三餐',
      icon: '',
      select: true,
    },
    {
      id: 2,
      label: '饮料',
      icon: '',
      select: false,
    },
    {
      id: 3,
      label: '外卖',
      icon: '',
      select: false,
    },
    {
      id: 4,
      label: '零食',
      icon: '',
      select: false,
    },
    {
      id: 5,
      label: '日常',
      icon: '',
      select: false,
    },
    {
      id: 6,
      label: '购物',
      icon: '',
      select: false,
    },
  ])
  const itemClassName = 'flex justify-center items-center p-4 rounded-lg bg-white'
  return (
    <ul className="grid grid-cols-4 gap-4 m-4">
      {
        categories.map((v, i) => {
          return (
            <li
              key={`${v.label}-${i}`}
              className={normalizeClassName(itemClassName, v.select ? 'bg-slate-900 text-stone-50' : '')}
              onClick={() => {
                const _categories = categories.map((v, ii) => {
                  return {
                    ...v,
                    select: i === ii,
                  }
                })
                setCategories(_categories)
                onSelect(v.id)
              }}
            >
              {v.label}
            </li>
          )
        })
      }
      <li key="setting" className={itemClassName}>
        <AiOutlineSetting size="2em" />
      </li>
    </ul>
  )
}
