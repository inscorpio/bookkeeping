import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { Decimal } from '@prisma/client/runtime/library'
import { Toaster } from '~/components/ui/toaster'
import { isObject } from '~/utils'
import './globals.css'

const originalStringify = JSON.stringify

function rewriteJSONStringify() {
  JSON.stringify = function (value, replacer: any, space) {
    if (!replacer && isObject(value)) {
      replacer = function (this: any, key: string, value: unknown) {
        if (this[key] instanceof Decimal) {
          return this[key].toNumber()
        }
        return value
      }
    }
    return originalStringify(value, replacer, space)
  }
}

rewriteJSONStringify()

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
