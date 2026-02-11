import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Head } from '@/infra/common/seo'
import { useNavigate } from 'react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { loginInputSchema, useLogin, type LoginInput } from '@/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Flex } from '@/components/common'
import { paths } from '@/infra/paths'
import { Label } from '@/components/ui/label'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Lock } from 'lucide-react'
import { PasswordInput } from '@/components/common/inputs'
import { Spinner } from '@/components/ui/spinner'

export function LoginRoute() {
  const navigate = useNavigate()
  const loginMutation = useLogin({
    onSuccess: () => {
      navigate(paths.app.root.getHref())
    }
  })

  const methods = useForm<LoginInput>({
    resolver: standardSchemaResolver(loginInputSchema),
    defaultValues: {
      login: '',
      password: ''
    }
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = methods

  const isValidForm = Boolean(errors.login?.message || errors.password?.message)

  return (
    <>
      <Head title="Login" />

      <Flex className="justify-center items-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader className="relative">
            <CardTitle className="text-xl text-center">
              <Flex className="w-full justify-center gap-2">
                <Lock />
                Account Login
              </Flex>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
                <Flex className="flex-col gap-4">
                  <Flex className="justify-between">
                    <Label htmlFor="login">Username/Email</Label>
                    {errors.login && <span className="text-xs inline-block text-red-500">{errors.login.message}</span>}
                  </Flex>
                  <Input id="login" placeholder="Username or email" {...register('login')} />

                  <PasswordInput<LoginInput> />

                  <Button variant="outline" type="submit" disabled={loginMutation.isPending || isValidForm}>
                    {loginMutation.isPending ? <Spinner /> : 'Login'}
                  </Button>
                </Flex>
              </form>
            </FormProvider>
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
                Forgot password?
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </Flex>
    </>
  )
}
