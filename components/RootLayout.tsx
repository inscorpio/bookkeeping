import type { ReactNode } from 'react'
import MenuBar from '~/components/MenuBar'

export default function RootLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full pt-6">
      <header className="px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
      <footer className="w-full">
        <MenuBar />
      </footer>
    </div>
  )
}
