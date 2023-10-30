'use client'

import { useState } from 'react'
import {
  AiOutlineCalendar,
  AiOutlineClear,
} from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { normalizeClassName } from '~/utils'

export default function Keyboard() {
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
  const initialValue = '0'
  const [value, setValue] = useState(initialValue)

  return (
    <div className="space-y-2">
      <ul className="flex items-center gap-2 p-2 w-full text-xs bg-white">
        <li className="flex items-center gap-1">
          <AiOutlineCalendar size="1.2em" />
          <span className="mt-[2px]">今天</span>
        </li>
        <li className="ml-auto">
          ¥
          {' '}
          <span className="text-base" data-testid="value">
            {value}
          </span>
        </li>
      </ul>
      <ul className="grid grid-cols-4 gap-1">
        {
          squares.map((v, i) => {
            return (
              <li
                key={i}
                className={normalizeClassName('flex justify-center items-center py-2 rounded-sm bg-white', v !== '保存' ? 'text-base' : 'row-span-3')}
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
    }
    else {
      handleIcon(v)
    }
  }

  function handleNumber(v: number) {
    if (value.includes('.')) {
      if (/\.(\d*)/.exec(value)?.[1].length === 2)
        return
    }
    setValue(value !== initialValue ? `${value}${v}` : `${v}`)
  }

  function handleDot(v: string) {
    if (v === '.') {
      if (value.includes('.'))
        return
      setValue(`${value}.`)
    }
  }

  function handleIcon(v: JSX.Element) {
    if (v.type.name === 'AiOutlineClear') {
      setValue(initialValue)
    }
    else if (v.type.name === 'FiDelete') {
      if (value === initialValue)
        return
      setValue(value.slice(0, -1))
      setValue(v => v || initialValue)
    }
  }
}
