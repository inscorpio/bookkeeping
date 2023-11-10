import type { ReactNode } from 'react'

export default function Amount({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <>
      <div className={className}>
        ¥
        {' '}
        <span className="text-base">
          {children}
        </span>
      </div>
    </>
  )
}
