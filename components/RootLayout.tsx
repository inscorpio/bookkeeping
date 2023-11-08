import Link from 'next/link'
import type { ReactNode } from 'react'
import { AiOutlineHome, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai'

export default function RootLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full pt-6 bg-white">
      <header className="px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        {children}
      </main>
      <footer className="w-full">
        <nav className="flex items-center border-t border-t-stone-100">
          <Link
            href="/"
            className="flex justify-center items-center flex-1 text-center h-10 leading-10"
          >
            <AiOutlineHome size="2em" />
          </Link>
          <div
            className="flex justify-center flex-1 text-center h-10 leading-10"
          >
            <Link
              href="/create"
              className="z-10 flex justify-center items-center mt-[-15px] w-[50px] h-[50px] border-t border-stone-100 rounded-full bg-stone-950 text-stone-50"
            >
              <AiOutlinePlus size="2em" />
            </Link>
          </div>
          <Link
            href="/settings"
            className="flex justify-center items-center flex-1 text-center h-10 leading-10"
          >
            <AiOutlineSetting size="2em" />
          </Link>
        </nav>
      </footer>
    </div>
  )
}
