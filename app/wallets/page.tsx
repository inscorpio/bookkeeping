import AddAccount from '~/app/wallets/_components/AddAccount'
import BackToHome from '~/components/BackToHome'
import { Container, Header, Main } from '~/components/ui/layout'

export default function Pages() {
  return (
    <>
      <Container>
        <Header className="flex-x-between">
          <BackToHome />
          <AddAccount />
        </Header>
        <Main>
          wallets
        </Main>
      </Container>
    </>
  )
}
