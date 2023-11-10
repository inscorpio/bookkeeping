import Link from 'next/link'
import Amount from '~/components/Amount'
import { Card, CardContent, CardHeader } from '~/components/ui/card'

export default function Wallet() {
  return (
    <>
      <h2>
        <Link href="/wallets">
          我的钱包
        </Link>
      </h2>
      <Card>
        <CardHeader>
          <h3>
            微信
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex">
            - 余额：
            <Amount>100</Amount>
          </div>
          <div className="flex">
            - 今日消费：
            <Amount>100</Amount>
          </div>
          <div className="flex">
            - 本月消费：
            <Amount>100</Amount>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
