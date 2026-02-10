import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Head } from '@/infra/common/seo'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import type { LoginInput } from '@/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Flex } from '@/components/common'
import { paths } from '@/infra/paths'

export function LoginRoute() {
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm<LoginInput>({})

  return (
    <>
      <Head title="Login" />

      <Flex className="justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader className="relative">
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your username or email below to login to your account</CardDescription>
            <CardAction>
              <Button
                variant="link"
                className="pt-0 absolute top-[-0.4rem] right-2"
                onClick={() => navigate(paths.auth.register.getHref())}
              >
                Sign up
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <Flex className="flex-col gap-4">
                <Input placeholder="Username or email" {...register('login', { required: true })} />
                <Input type="password" placeholder="Password" {...register('password', { required: true })} />
                <Button variant="default" type="submit">
                  Login
                </Button>
              </Flex>
            </form>
          </CardContent>
        </Card>
      </Flex>
    </>
  )
}
