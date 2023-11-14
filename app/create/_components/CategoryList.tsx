'use client'
import Link from 'next/link'
import { AiOutlineSetting } from 'react-icons/ai'
import type { CategoryClient } from '~/types'
import { Button } from '~/components/ui/button'

export default function CategoryList({ categories, selectIndex, onSelect }: { categories: CategoryClient[]; selectIndex: number; onSelect: (index: number) => void }) {
  return (
    <>
      <ul className="grid grid-cols-4 gap-4">
        {
          // eslint-disable-next-line antfu/consistent-list-newline
          categories.map((v, i) => (
            <li key={v.id} className="bg-white rounded-lg">
              <Button
                variant={i === selectIndex ? 'default' : 'white'}
                className="w-full"
                onClick={() => onSelect(i)}
              >
                {v.label}
              </Button>
            </li>
          ))
        }
        <li key="setting">
          <Link href="/category/create">
            <Button variant="white" className="w-full">
              <AiOutlineSetting size="2em" />
            </Button>
          </Link>
        </li>
      </ul>
    </>
  )
}
