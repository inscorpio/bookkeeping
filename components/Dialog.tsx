import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

interface Props {
  visible?: boolean
  confirm?: ReactNode
  children?: ReactNode
  onClose: () => void
}

export default function Dialog(
  {
    visible = false,
    confirm,
    children,
    onClose,
  }: Props,
) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (dialogRef.current) {
      // I don't known why it throws an InvalidStateError error on a mobile phone without try...catch...
      try {
        visible
          ? dialogRef.current.showModal()
          : dialogRef.current.close()
      }
      catch {}
    }
  }, [visible])

  return (
    <dialog
      ref={dialogRef}
      className="w-screen max-w-none m-0 mt-auto text-stone-950 outline-none"
    >
      <div className="flex flex-col w-full h-[248px] py-3">
        <div className="flex justify-between items-center px-3">
          <button onClick={onClose}>取消</button>
          {confirm}
        </div>
        <div className="flex-1 mt-2 overflow-hidden">
          {children}
        </div>
      </div>
    </dialog>
  )
}
