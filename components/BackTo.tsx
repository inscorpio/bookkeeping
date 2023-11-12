import { CaretLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function BackTo({ href = '/' }: { href?: string }) {
  return (
    <>
      <Link href={href}>
        <div className="flex-y-center gap-1">
          <CaretLeftIcon width="2em" height="2em" />
        </div>
      </Link>
    </>
  )
}
