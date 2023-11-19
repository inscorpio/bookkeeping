import { fetchBillGroups } from '~/actions/Bill'
import Amount from '~/components/Amount'

export default async function Bill() {
  const billGroups = await fetchBillGroups()
  return (
    <>
      <h2>账单</h2>
      {
        billGroups.map(group => (
          <div key={group.date} className="py-4 px-2 rounded-md shadow-md">
            <div className="flex-x-between flex-y-center px-2 py-1 mb-1 border-b border-dashed border-stone-200">
              <h3>{group.date}</h3>
              {group.bills.length > 1 && <Amount>{group.amount.toNumber()}</Amount>}
            </div>
            {
              group.bills.map(bill => (
                <div key={bill.id} className="flex-x-between flex-y-center py-1 px-2 rounded hover:bg-stone-50">
                  <div>{bill.note || bill.category.label}</div>
                  <Amount>{bill.amount.toNumber()}</Amount>
                </div>
              ))
            }
          </div>
        ))
      }
    </>
  )
}
