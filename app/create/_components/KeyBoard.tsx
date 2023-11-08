'use client'

import { AiOutlineClear } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { Button } from '~/components/ui/button'

export default function Keyboard({ value, onInput, onSave }: { value: string; onInput: (amount: string) => void; onSave: () => void }) {
  const squares = [
    1,
    2,
    3,
    <FiDelete />,
    4,
    5,
    6,
    '保存',
    7,
    8,
    9,
    <AiOutlineClear />,
    0,
    '.',
  ]
  const initialValue = '0'

  return (
    <>
      <ul className="grid grid-cols-4 gap-1">
        {
          squares.map((v, i) => {
            return (
              <li
                key={i}
                className={!isSave(v) ? 'text-base' : 'row-span-3'}
              >
                <Button
                  variant={isSave(v) ? 'default' : 'outline'}
                  className="w-full h-full"
                  onClick={() => handleType(v)}
                >
                  {v}
                </Button>
              </li>
            )
          })
        }
      </ul>
    </>
  )

  function handleType(v: string | number | JSX.Element) {
    if (typeof v === 'number') {
      handleNumber(v)
    }
    else if (typeof v === 'string') {
      handleDot(v)
      isSave(v) && onSave()
    }
    else {
      handleIcon(v)
    }
  }

  function isSave(v: unknown) {
    return v === '保存'
  }

  function handleNumber(v: number) {
    if (value.includes('.')) {
      if (/\.(\d*)/.exec(value)?.[1].length === 2)
        return
    }
    onInput(value !== initialValue ? `${value}${v}` : `${v}`)
  }

  function handleDot(v: string) {
    if (v === '.') {
      if (value.includes('.')) return
      onInput(`${value}.`)
    }
  }

  function handleIcon(v: JSX.Element) {
    if (v.type.name === 'AiOutlineClear') {
      onInput(initialValue)
    }
    else if (v.type.name === 'FiDelete') {
      if (value === initialValue)
        return
      const _amount = value.slice(0, -1) || initialValue
      onInput(_amount)
    }
  }
}
