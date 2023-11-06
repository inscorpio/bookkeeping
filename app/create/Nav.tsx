'use client'
import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'

export default function Nav() {
  const router = useRouter()
  return (
    <nav className="flex px-3">
      <button onClick={() => {
        router.back()
      }}
      >
        <IoIosArrowBack size="1.5em" />
      </button>
    </nav>
  )
}
