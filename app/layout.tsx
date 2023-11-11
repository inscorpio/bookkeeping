import clsx from 'clsx'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '~/components/ui/toaster'
import './globals.css'

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
    <html lang="zh" className="flex-center w-screen h-screen">
      <body
        className={clsx(
          inter.className,
          'flex-center rounded-md w-full h-full md:border md:max-w md:max-h text-sm text-stone-950 select-none',
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
