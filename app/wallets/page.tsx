import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import Amount from '~/components/Amount'
import BackTo from '~/components/BackTo'
import { Container, Header, Main } from '~/components/ui/layout'
import { RequestUrl } from '~/types'
import { request } from '~/utils'

export default async function Page() {
  const wallets = await request.get(RequestUrl.wallet) ?? []
  return (
    <>
      <Container>
        <Header className="flex-x-between">
          <BackTo />
          <Link href="wallets/create">
            <PlusIcon width="1.5em" height="1.5em" />
          </Link>
        </Header>
        <Main className="space-y-4">
          {
            wallets.map(account => (
              <div key={account.id} className="flex-x-between flex-y-center p-3 rounded-md shadow">
                <span>{account.name}</span>
                <Amount>{account.amount}</Amount>
              </div>
            ))
          }
        </Main>
      </Container>
    </>
  )
}
