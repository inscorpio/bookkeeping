import type { ReactNode } from 'react'
import Menu from '~/components/Menu'

export default function RootLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full pt-6 bg-white">
      <header className="px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        {children}
      </main>
      <Menu />
    </div>
  )
}
