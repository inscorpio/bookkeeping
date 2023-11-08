import type { PropsWithChildren } from 'react'

export default function Amount({ children }: PropsWithChildren) {
  return (
    <>
      <div>
        ¥
        {' '}
        <span className="text-base">
          {children}
        </span>
      </div>
    </>
  )
}
