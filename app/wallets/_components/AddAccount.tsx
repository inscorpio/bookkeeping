'use client'
import { PlusIcon } from '@radix-ui/react-icons'
import { useToast } from '~/components/ui/use-toast'

export default function AddAccount() {
  const { toast } = useToast()
  return (
    <>
      <button onClick={() => {
        toast({
          title: 'TODO',
        })
      }}
      >
        <PlusIcon width="1.5em" height="1.5em" />
      </button>
    </>
  )
}
