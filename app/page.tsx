import { requestBillsGroupByDate } from '~/api/bill'
import Wallet from '~/app/_components/Wallet'
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

export const dynamic = 'fore-dynamic'
export default async function HomePage() {
  const { data: billsGroupByDate } = await requestBillsGroupByDate()
  return (
    <RootLayout title="主页">
      <div className="flex flex-col gap-4">
        <Wallet />
        <h2>账单</h2>
        {
          billsGroupByDate.map(group => (
            <Card key={group.date}>
              <CardHeader className="p-4">
                <CardTitle className="text-xl">{group.date}</CardTitle>
                <Amount>{group.amount}</Amount>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Table>
                  <TableBody>
                    {
                      group.bills.map(bill => (
                        <TableRow key={bill.id}>
                          <TableCell>{bill.note || bill.category.label}</TableCell>
                          <TableCell>
                            <Amount>
                              {bill.amount.toNumber()}
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
