'use client'
import dayjs from 'dayjs'
import DatePickerColumn from '~/components/DatePickerColumn'
import Dialog from '~/components/Dialog'

interface Props {
  visible?: boolean
  value?: Date
  startDate?: number
  endDate?: number
  onClose: () => void
  onComfirm: (date: Date) => void
}

const date = new Date()

export default function DatePicker(
  {
    visible,
    value = date,
    startDate = dayjs(date).year() - 10,
    endDate = dayjs(date).year() + 10,
    onClose,
    onComfirm,
  }: Props,
) {
  const year = dayjs(value).year()
  const month = dayjs(value).month() + 1
  const day = dayjs(value).date()

  const years = Array.from({ length: endDate - startDate + 1 }).map((_, i) => `${startDate + i}年`)
  const months = Array.from({ length: 12 }).map((_, i) => `${i + 1}月`)
  const days = Array.from({ length: dayjs(value).daysInMonth() }).map((_, i) => `${i + 1}日`)

  let selectYearIndex = years.findIndex(v => v === `${year}年`)
  let selectMonthIndex = months.findIndex(v => v === `${month}月`)
  let selectDayIndex = days.findIndex(v => v === `${day}日`)

  const confirm = (
    <button onClick={() => {
      const year = years[selectYearIndex].slice(0, 4)
      const rawMonth = months[selectMonthIndex]
      const month = (rawMonth.length === 2
        ? `0${rawMonth}`
        : rawMonth
      ).slice(0, 2)
      const rawDay = days[selectDayIndex]
      const day = (rawDay.length === 2
        ? `0${rawDay}`
        : rawDay
      ).slice(0, 2)
      const dayJsDate = dayjs(`${year}-${month}-${day}`)
      const date = dayJsDate.toDate()
      onComfirm(date)
      onClose()
    }}
    >
      确定
    </button>
  )
  return (
    <Dialog visible={visible} confirm={confirm} onClose={onClose}>
      <div className="reactive h-full">
        <div className="absolute w-full h-7 border-y border-stone-300"></div>
        <ul className="flex justify-center gap-6 h-full text-lg">
          <DatePickerColumn
            columns={years}
            selectIndex={selectYearIndex}
            onSelect={(index) => {
              selectYearIndex = index
            }}
          />
          <DatePickerColumn
            columns={months}
            selectIndex={selectMonthIndex}
            onSelect={(index) => {
              selectMonthIndex = index
            }}
          />
          <DatePickerColumn
            columns={days}
            selectIndex={selectDayIndex}
            onSelect={(index) => {
              selectDayIndex = index
            }}
          />
        </ul>
      </div>
    </Dialog>
  )
}
