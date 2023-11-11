import { CaretLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function BackToHome() {
  return (
    <>
      <Link href="/">
        <div className="flex-y-center gap-1">
          <CaretLeftIcon width="2em" height="2em" />
          <span className="text-lg">主页</span>
        </div>
      </Link>
    </>
  )
}
