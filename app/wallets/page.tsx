import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import BackTo from '~/components/BackTo'
import { Container, Header, Main } from '~/components/ui/layout'

export default function Page() {
  return (
    <>
      <Container>
        <Header className="flex-x-between">
          <BackTo />
          <Link href="wallets/create">
            <PlusIcon width="1.5em" height="1.5em" />
          </Link>
        </Header>
        <Main>
          wallets
        </Main>
      </Container>
    </>
  )
}
