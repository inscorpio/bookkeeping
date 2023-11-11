import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '~/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MoneyWhere',
  description: 'An expense tracking app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className="flex justify-center items-center w-screen h-screen">
      <body
        className={clsx(
          inter.className,
          'flex justify-center items-center rounded-md w-full h-full md:border md:max-w md:max-h text-sm text-stone-950 select-none',
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
