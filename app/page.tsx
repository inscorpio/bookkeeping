import type { Bill, Category } from '@prisma/client'
import RootLayout from '~/components/RootLayout'
import { request } from '~/utils/request'

interface BillGroupByDate {
  date: string
  bills: (Bill & { category: Category })[]
}

export default async function HomePage() {
  const billsGroupByDate = await request<BillGroupByDate[]>('bill')
  // await new Promise(resolve => setTimeout(() => resolve(true), 3000))
  return (
    <RootLayout title="主页">
      <ul>
        {
          billsGroupByDate.map(group => (
            <li key={group.date}>
              {group.date}
              {
                  group.bills.map(bill => (
                    <div key={bill.id}>
                      <span>
                        {bill.category.label}
                        ：
                      </span>
                      <span>{bill.amount}</span>
                    </div>
                  ))
                }
            </li>
          ))
        }
      </ul>
    </RootLayout>
  )
}
