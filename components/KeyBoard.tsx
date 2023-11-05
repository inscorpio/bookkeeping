'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { AiOutlineClear } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { normalizeClassName } from '~/utils'

interface Props {
  children?: ReactNode
  onSave: (amount: number) => void
}

export default function Keyboard(
  {
    children,
    onSave,
  }: Props,
) {
  const squares = [
    1,
    2,
    3,
    <FiDelete data-testid="icon-backspace" />,
    4,
    5,
    6,
    '保存',
    7,
    8,
    9,
    <AiOutlineClear data-testid="icon-clear" />,
    0,
    '.',
  ]
  const initialAmount = '0'
  const [amount, setAmount] = useState(initialAmount)

  return (
    <div className="space-y-2">
      <ul className="flex items-center gap-2 p-2 w-full text-xs bg-white">
        {children}
        <li className="ml-auto">
          ¥
          {' '}
          <span className="text-base" data-testid="value">
            {amount}
          </span>
        </li>
      </ul>
      <ul className="grid grid-cols-4 gap-1">
        {
          squares.map((v, i) => {
            return (
              <li
                key={i}
                className={normalizeClassName('flex justify-center items-center py-2 rounded-sm bg-white', !isSave(v) ? 'text-base' : 'row-span-3')}
                onClick={() => handleType(v)}
              >
                {v}
              </li>
            )
          })
        }
      </ul>
    </div>
  )

  function handleType(v: string | number | JSX.Element) {
    if (typeof v === 'number') {
      handleNumber(v)
    }
    else if (typeof v === 'string') {
      handleDot(v)
      handleSave(v)
    }
    else {
      handleIcon(v)
    }
  }

  function isSave(v: unknown) {
    return v === '保存'
  }

  function handleSave(v: string) {
    if (isSave(v)) {
      onSave(+amount)
    }
  }

  function handleNumber(v: number) {
    if (amount.includes('.')) {
      if (/\.(\d*)/.exec(amount)?.[1].length === 2)
        return
    }
    setAmount(amount !== initialAmount ? `${amount}${v}` : `${v}`)
  }

  function handleDot(v: string) {
    if (v === '.') {
      if (amount.includes('.'))
        return
      setAmount(`${amount}.`)
    }
  }

  function handleIcon(v: JSX.Element) {
    if (v.type.name === 'AiOutlineClear') {
      setAmount(initialAmount)
    }
    else if (v.type.name === 'FiDelete') {
      if (amount === initialAmount)
        return
      const _amount = amount.slice(0, -1) || initialAmount
      setAmount(_amount)
    }
  }
}
