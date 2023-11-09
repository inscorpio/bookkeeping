'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AiFillHome,
  AiFillSetting,
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineSetting,
} from 'react-icons/ai'

export default function Menu() {
  const pathname = usePathname()
  return (
    <>
      <footer className="w-full">
        <nav className="flex items-center border-t border-t-stone-100">
          <Link
            href="/"
            className="flex justify-center items-center flex-1 text-center h-10 leading-10"
          >
            {
              pathname === '/'
                ? <AiFillHome size="2em" />
                : <AiOutlineHome size="2em" />
            }

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
            {
              pathname === '/settings'
                ? <AiFillSetting size="2em" />
                : <AiOutlineSetting size="2em" />
            }
          </Link>
        </nav>
      </footer>
    </>
  )
}
