import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Head } from '@/infra/common/seo'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { loginInputSchema, type LoginInput } from '@/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Flex } from '@/components/common'
import { paths } from '@/infra/paths'
import { Label } from '@/components/ui/label'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'

export function LoginRoute() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInput>({
    resolver: standardSchemaResolver(loginInputSchema),
    defaultValues: {
      login: '',
      password: ''
    }
  })

  return (
    <>
      <Head title="Login" />

      <Flex className="justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader className="relative">
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your username or email below to login to your account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <Flex className="flex-col gap-4">
                <Flex className="justify-between">
                  <Label htmlFor="login">Username or email</Label>
                  {errors.login && <span className="text-xs inline-block text-red-500">{errors.login.message}</span>}
                </Flex>
                <Input id="login" placeholder="Username or email" {...register('login')} />

                <Flex className="justify-between">
                  <Label htmlFor="password">Password</Label>
                  {errors.password && (
                    <span className="text-xs inline-block text-red-500">{errors.password.message}</span>
                  )}
                </Flex>

                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
                <Button variant="outline" type="submit">
                  Login
                </Button>
              </Flex>
            </form>
          </CardContent>

          <CardFooter className="justify-between">
            <CardAction>
              <Button
                variant="link"
                // className="pt-0 absolute top-[-0.4rem] right-2"
                className="px-0"
                onClick={() => navigate(paths.auth.register.getHref())}
              >
                Sign up here!
              </Button>
            </CardAction>

            <CardAction>
              <Button
                variant="link"
                disabled
                className="text-muted-foreground px-0"
                onClick={() => navigate(paths.auth.register.getHref())}
              >
                Recover password
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </Flex>
    </>
  )
}
