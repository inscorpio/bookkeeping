import RootLayout from '~/components/RootLayout'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

export default function SettingsPage() {
  return (
    <RootLayout title="设置">
      <div className="flex-y-center gap-2">
        <Avatar className="w-16 h-16">
          <AvatarImage src="https://github.com/inscorpio.png" />
          <AvatarFallback>Ins</AvatarFallback>
        </Avatar>
        Linyx
      </div>
    </RootLayout>
  )
}
