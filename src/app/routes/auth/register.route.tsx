import { useEmailCheckQuery } from '@/api/users'
import { registerInputSchema, useRegister, type RegisterInput } from '@/auth'
import { Flex } from '@/components/common'
import { isValidForm, PasswordInput } from '@/components/common/inputs'
import { toastDescriptionWrapper, useNotificationsStore } from '@/components/common/notifications'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardAction } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BIOGRAPHY, PASSWORD } from '@/domain/validation'
import { Head } from '@/infra/common/seo'
import { paths } from '@/infra/paths'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { User2 } from 'lucide-react'
import { Fragment, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useDebounceValue } from 'usehooks-ts'

const FORM_INPUTS: { id: keyof RegisterInput; placeholder: string; label: string; maxLength?: number | null }[] = [
  {
    id: 'email',
    label: 'Email',
    placeholder: 'ada@lovelace.com'
  },
  {
    id: 'username',
    label: 'Username',
    placeholder: 'ada_lovelace',
    maxLength: registerInputSchema.shape.username.maxLength
  },
  {
    id: 'first_name',
    label: 'First name',
    placeholder: 'Ada',
    maxLength: registerInputSchema.shape.first_name.maxLength
  },
  {
    id: 'last_name',
    label: 'Last name',
    placeholder: 'Lovelace',
    maxLength: registerInputSchema.shape.last_name.maxLength
  },
  {
    id: 'bio',
    label: 'Biography',
    placeholder: 'Short description about yourself',
    maxLength: BIOGRAPHY.max
  },
  {
    id: 'password',
    label: 'Password',
    placeholder: 'passWord123!',
    maxLength: PASSWORD.max
  },
  {
    id: 'password_confirmation',
    label: 'Password Confirmation',
    placeholder: 'passWord123!',
    maxLength: PASSWORD.max
  }
]

export function RegisterRoute() {
  const notificationsStore = useNotificationsStore()
  const methods = useForm<RegisterInput>({
    resolver: standardSchemaResolver(registerInputSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      bio: '',
      password: '',
      password_confirmation: ''
    }
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    clearErrors
  } = methods
  const emailWatch = watch('email')

  const navigate = useNavigate()

  const registerMutation = useRegister({
    onSuccess: () => {
      navigate(paths.app.root.getHref())
    },
    onError: (error) => {
      notificationsStore.addNotification({
        title: 'Register failed',
        description: toastDescriptionWrapper(error),
        type: 'error'
      })
    }
  })

  /**
   * Problem only occurs if we use it in memo or callback
   */

  const [debouncedEmail, setDebounced] = useDebounceValue(emailWatch, 500)
  const emailCheckQuery = useEmailCheckQuery({ email: debouncedEmail })

  useEffect(() => {
    const mutate = async () => {
      if (debouncedEmail) {
        const mutated = await emailCheckQuery.refetch()

        if (mutated.isError) return
        if (mutated.data) {
          console.log('EMAIL ALREADY EXISTS')
          setError('email', { message: 'Email already exists' })
        } else {
          clearErrors('email')
        }
      }
    }

    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, debouncedEmail, setError])
  console.log('errors', errors)

  return (
    <>
      <Head title="Register" />

      <Flex className="flex min-h-full flex-1 items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="relative">
            <CardTitle className="text-xl text-center">
              <Flex className="w-full justify-center gap-2">
                <User2 />
                Account Registration
              </Flex>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit((data) => registerMutation.mutate(data))}>
                <Flex className="flex-col gap-4">
                  {FORM_INPUTS.map((fi) => {
                    if (fi.id === 'password' || fi.id === 'password_confirmation') {
                      return (
                        <PasswordInput<RegisterInput>
                          key={fi.id}
                          id={fi.id}
                          label={fi.label}
                          placeholder={fi.placeholder}
                          {...register(fi.id)}
                        />
                      )
                    }

                    return (
                      <Fragment key={fi.id}>
                        <Flex className="justify-between">
                          <Label htmlFor={fi.id}>{fi.label}</Label>
                          {fi.id in errors && (
                            <span className="text-xs inline-block text-red-500">{errors[fi.id]!.message}</span>
                          )}
                        </Flex>
                        <Input
                          id={fi.id}
                          placeholder={fi.placeholder}
                          {...register(fi.id)}
                          className="placeholder-shown:italic"
                          maxLength={fi?.maxLength ?? undefined}
                          onChange={(e) => {
                            if (fi.id === 'email') {
                              setDebounced(e.target.value)
                            }
                          }}
                        />
                      </Fragment>
                    )
                  })}

                  <Button variant="outline" type="submit" disabled={isValidForm(errors)}>
                    Register
                  </Button>
                </Flex>
              </form>
            </FormProvider>
          </CardContent>

          <CardFooter className="justify-between">
            <CardAction>
              <Button variant="link" className="px-0" onClick={() => navigate(paths.auth.login.getHref())}>
                Already have an account? Login here!
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </Flex>
    </>
  )
}
