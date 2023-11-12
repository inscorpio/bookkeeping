'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { requestWalletAccountCreate } from '~/api/wallet'
import BackTo from '~/components/BackTo'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Input as InputFix, InputProvider, Prefix } from '~/components/ui/input.fix'
import { Container, Header, Main } from '~/components/ui/layout'
import { toast } from '~/components/ui/use-toast'
import { walletAccountFormSchema } from '~/schemas'
import { showZodErrorToasts } from '~/utils'

type WalletAccountForm = z.infer<typeof walletAccountFormSchema>

export default function Page() {
  const router = useRouter()
  const form = useForm<WalletAccountForm>({
    resolver: zodResolver(walletAccountFormSchema),
    defaultValues: {
      name: '',
      amount: '',
    },
  })

  async function onSubmit(walletAccount: WalletAccountForm) {
    const { success, message, errors } = await requestWalletAccountCreate({
      ...walletAccount,
      amount: Number(walletAccount.amount),
    }) ?? {}
    await showZodErrorToasts(errors)
    toast({ title: message })
    if (success) {
      router.push('/wallets')
    }
  }
  return (
    <>
      <Container>
        <Header className="flex-x-between">
          <BackTo href="/wallets" />
          <button onClick={form.handleSubmit(onSubmit)}>保存</button>
        </Header>
        <Main>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">账户名称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入账户名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>账户余额</FormLabel>
                    <FormControl>
                      <InputProvider>
                        <Prefix>
                          ¥
                        </Prefix>
                        <InputFix
                          type="number"
                          placeholder="0.00"
                          {...field}
                        />
                      </InputProvider>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Main>
      </Container>
    </>
  )
}
