'use client'
import { AiOutlineSetting } from 'react-icons/ai'
import type { CategoryClient } from '~/api/category'
import { Button } from '~/components/ui/button'

export default function CategoryList({ categories, selectIndex, onSelect }: { categories: CategoryClient[]; selectIndex: number; onSelect: (index: number) => void }) {
  return (
    <>
      <ul className="grid grid-cols-4 gap-4 m-4">
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
          <Button variant="white" className="w-full">
            <AiOutlineSetting size="2em" />
          </Button>
        </li>
      </ul>
    </>
  )
}
