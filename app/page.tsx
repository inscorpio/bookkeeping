import Bill from '~/app/_components/Bill'
import Wallet from '~/app/_components/Wallet'
import RootLayout from '~/components/RootLayout'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <RootLayout title="主页">
      <div className="flex flex-col gap-4">
        <Wallet />
        <Bill />
      </div>
    </RootLayout>
  )
}
