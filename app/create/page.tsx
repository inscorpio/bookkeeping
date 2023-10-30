'use client'

import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'
import Keyboard from '~/components/KeyBoard'

export default function Create() {
  const router = useRouter()
  return (
    <div className="flex flex-col w-full h-full pt-4 bg-stone-100">
      <nav className="flex px-3">
        <button onClick={() => {
          router.back()
        }}
        >
          <IoIosArrowBack size="1.5em" />
        </button>
      </nav>
      <div className="flex-1"></div>
      <Keyboard />
    </div>
  )
}
