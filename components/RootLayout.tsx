import type { ReactNode } from 'react'
import Menu from '~/components/Menu'
import { Container, Footer, Header, Main } from '~/components/ui/layout'

export default function RootLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Container>
      <Header>
        <h1 className="text-4xl">{title}</h1>
      </Header>
      <Main>
        {children}
      </Main>
      <Footer>
        <Menu />
      </Footer>
    </Container>
  )
}
