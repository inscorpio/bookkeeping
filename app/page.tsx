import type { Bill, Category } from '@prisma/client'
import Amount from '~/components/Amount'
import RootLayout from '~/components/RootLayout'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '~/components/ui/table'
import { RequestModule, request } from '~/utils/request'

interface BillGroupByDate {
  date: string
  bills: (Bill & { category: Category })[]
}

export default async function HomePage() {
  const billsGroupByDate = await request<BillGroupByDate[]>(RequestModule.bill)
  // await new Promise(resolve => setTimeout(() => resolve(true), 3000))
  return (
    <RootLayout title="主页">
      <div className="flex flex-col gap-4">
        {
          billsGroupByDate.map(group => (
            <Card key={group.date}>
              <CardHeader className="p-4">
                <CardTitle className="text-xl">{group.date}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Table>
                  <TableBody>
                    {
                      group.bills.map(bill => (
                        <TableRow key={bill.id}>
                          <TableCell>{bill.category.label}</TableCell>
                          <TableCell>
                            <Amount>
                              {bill.amount}
                            </Amount>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </RootLayout>
  )
}
