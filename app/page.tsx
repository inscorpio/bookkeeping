'use client'

import { useRouter } from 'next/navigation'
import { AiOutlineHome, AiOutlinePlus, AiOutlineSetting } from 'react-icons/ai'

export default function Home() {
  const router = useRouter()
  return (
    <div className='w-full h-full pt-6'>
      <header className='px-4'>
        <h1 className='text-4xl font-bold'>主页</h1>
      </header>
      <main className='p-4'>
        hello bookkeeping
      </main>
      <footer className="fixed bottom-0 left-0 w-full">
        <nav className="flex items-center border-t border-t-stone-100">
          <a className="flex justify-center items-center flex-1 text-center h-10 leading-10">
            <AiOutlineHome size="2em" />
          </a>
          <div
            className="flex justify-center flex-1 text-center h-10 leading-10"
            onClick={() => {
              router.push('/create')
            }}
          >
            <button className="flex justify-center items-center mt-[-15px] w-[50px] h-[50px] border-t border-stone-100 rounded-full bg-stone-950 text-stone-50">
              <AiOutlinePlus size="2em" />
            </button>
          </div>
          <a className="flex justify-center items-center flex-1 text-center h-10 leading-10">
            <AiOutlineSetting size="2em" />
          </a>
        </nav>
      </footer>
    </div>
  )
}
