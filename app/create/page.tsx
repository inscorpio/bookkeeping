'use client'

import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'
import Category from '~/app/create/Category'
import DatePicker from '~/components/DatePicker'
import Keyboard from '~/components/KeyBoard'
import { normalizeDate } from '~/utils'

export default function Create() {
  const router = useRouter()
  let categoryId: number
  const [visible, setVisible] = useState(false)
  const [date, setDate] = useState(new Date())
  return (
    <>
      <div className="flex flex-col w-full h-full pt-4 bg-stone-100">
        <nav className="flex px-3">
          <button onClick={() => {
            router.back()
          }}
          >
            <IoIosArrowBack size="1.5em" />
          </button>
        </nav>
        <div className="flex-1">
          <Category onSelect={(id) => {
            categoryId = id
          }}
          />
        </div>
        <Keyboard
          onSave={(amount) => {
            const form = {
              categoryId,
              amount,
              date: dayjs(date).unix(),
            }
            // eslint-disable-next-line no-console
            console.log(form)
            // TODO: call API
          }}
        >
          <li
            className="flex items-center gap-1"
            onClick={toggleDialog}
          >
            <AiOutlineCalendar size="1.2em" />
            <span className="mt-[2px]">{normalizeDate(date)}</span>
          </li>
        </Keyboard>
      </div>
      <DatePicker
        visible={visible}
        value={date}
        onClose={toggleDialog}
        onComfirm={handleComfirm}
      />
    </>
  )

  function toggleDialog() {
    setVisible(!visible)
  }

  function handleComfirm(date: Date) {
    setDate(date)
  }
}
