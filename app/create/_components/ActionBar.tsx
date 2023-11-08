import type { SelectSingleEventHandler } from 'react-day-picker'
import { AiOutlineCalendar } from 'react-icons/ai'
import Amount from '~/components/Amount'
import { Calendar } from '~/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '~/components/ui/dialog'
import { normalizeDate } from '~/utils'

export default function ActionBar({ date, onSelect, amount }: { date?: Date; onSelect: SelectSingleEventHandler; amount: string }) {
  return (
    <>
      <ul className="flex items-center gap-2 mb-2 p-2 w-full text-xs bg-white">
        <li>
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center gap-1">
                <AiOutlineCalendar size="1.2em" />
                <span className="mt-[2px]">
                  {normalizeDate(date)}
                </span>
              </div>
            </DialogTrigger>
            <DialogContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={onSelect}
                className="rounded-md border"
              />
            </DialogContent>
          </Dialog>
        </li>
        <li className="ml-auto">
          <Amount>{amount}</Amount>
        </li>
      </ul>
    </>
  )
}
