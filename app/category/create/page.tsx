'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
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
import { Container, Header, Main } from '~/components/ui/layout'
import { categorySchema } from '~/schemas'
import type { CategoryCreate } from '~/types'
import { RequestUrl } from '~/types'
import { request } from '~/utils'

export default function Page() {
  const router = useRouter()
  const form = useForm<CategoryCreate>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      label: '',
    },
  })

  async function onSubmit(category: CategoryCreate) {
    await request.post(RequestUrl.category, category)
    router.push('/create')
  }
  return (
    <>
      <Container>
        <Header className="flex-x-between">
          <BackTo href="/create" />
          <button onClick={form.handleSubmit(onSubmit)}>保存</button>
        </Header>
        <Main>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">分类名称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入分类名称" {...field} />
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
