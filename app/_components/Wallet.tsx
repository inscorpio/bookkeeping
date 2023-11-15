import Link from 'next/link'
import Amount from '~/components/Amount'
import { RequestUrl } from '~/types'
import { request } from '~/utils'

export default async function Wallet() {
  const wallets = await request.get(RequestUrl.wallet) ?? []
  return (
    <>
      <h2>
        <Link href="/wallets">
          我的钱包
        </Link>
      </h2>
      {
        wallets.map(wallet => (
          <div key={wallet.id} className="py-2 px-4 shadow rounded-md">
            <div className="flex-x-between flex-y-center pb-1 border-b border-dashed border-stone-200">
              <h4>{wallet.name}</h4>
              <Amount>{wallet.amount}</Amount>
            </div>
            <div className="flex-x-between mt-2">
              <div className="flex">
                今日消费：
                <Amount>100</Amount>
              </div>
              <div className="flex">
                本月消费：
                <Amount>100</Amount>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}
