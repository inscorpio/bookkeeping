'use client'
import { useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import DatePicker from '~/components/DatePicker'
import Keyboard from '~/components/KeyBoard'
import { normalizeDate } from '~/utils'

export default function KeyboardInput(
  {
    onSave,
    onSelectDate,
  }: {
    onSave: (amount: number) => void
    onSelectDate: (date: Date) => void
  },
) {
  const [visible, setVisible] = useState(false)
  const [date, setDate] = useState(new Date())
  function toggleDialog() {
    setVisible(!visible)
  }

  function handleComfirm(date: Date) {
    setDate(date)
    onSelectDate(date)
  }
  return (
    <>
      <Keyboard onSave={onSave}>
        <li
          className="flex items-center gap-1"
          onClick={toggleDialog}
        >
          <AiOutlineCalendar size="1.2em" />
          <span className="mt-[2px]">{normalizeDate(date)}</span>
        </li>
      </Keyboard>
      <DatePicker
        visible={visible}
        value={date}
        onClose={toggleDialog}
        onComfirm={handleComfirm}
      />
    </>
  )
}
