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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import type { WalletAccountClient } from '~/types'

export default function ActionBar({
  date,
  onSelect,
  amount,
  walletAccounts,
  onWalletChange,
}: {
  date?: Date
  onSelect: SelectSingleEventHandler
  amount: string
  walletAccounts: WalletAccountClient[]
  onWalletChange: (id: number) => void
}) {
  return (
    <>
      <ul className="flex-y-center gap-2 mb-2 p-2 w-full text-xs bg-white">
        <li>
          <Dialog>
            <DialogTrigger>
              <div className="flex-y-center gap-1">
                <AiOutlineCalendar size="1.2em" />
                <span className="mt-[2px]">
                  {normalizeDate(date)}
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className="flex-x-center max-w-xs">
              <Calendar
                mode="single"
                selected={date}
                onSelect={onSelect}
              />
            </DialogContent>
          </Dialog>
        </li>
        <li>
          <Select
            defaultValue={`${walletAccounts[0]?.id}`}
            onValueChange={(value) => { onWalletChange(+value) }}
          >
            <SelectTrigger className="h-auto py-1 border-none shadow-none text-xs">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              {
                walletAccounts.map(accout => (
                  <SelectItem
                    key={accout.id}
                    value={`${accout.id}`}
                    className="h-auto py-1 text-xs"
                  >
                    <span>{accout.name}</span> (<span>¥:</span><span className="text-sm">{accout.amount}</span>)
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </li>
        <li className="ml-auto">
          <Amount>{amount}</Amount>
        </li>
      </ul>
    </>
  )
}
