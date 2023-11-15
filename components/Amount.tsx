import type { ReactNode } from 'react'

export default function Amount({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <>
      <span className={className}>
        ¥
        {' '}
        <span className="text-base">
          {children}
        </span>
      </span>
    </>
  )
}
