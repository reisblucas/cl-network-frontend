import { createPostSchema, useCreatePostMutation, type CreatePostDto } from '@/api/posts'
import { useUser } from '@/auth'
import { Flex } from '@/components/common'
import { isValidForm } from '@/components/common/inputs'
import { useNotificationsStore } from '@/components/common/notifications'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Spinner } from '@/components/ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Head } from '@/infra/common/seo'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Balloon, RotateCcw } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

export function PostsRoute() {
  const user = useUser()
  const methods = useForm<Omit<CreatePostDto, 'username'>>({
    resolver: standardSchemaResolver(createPostSchema.omit({ username: true })),
    defaultValues: {
      title: '',
      content: ''
    }
  })

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = methods
  const notifications = useNotificationsStore()
  const createPostMutation = useCreatePostMutation({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          title: 'Post created successfully',
          description: 'Your post has been created successfully',
          type: 'success'
        })
        methods.reset()
      },
      onError: () => {
        notifications.addNotification({
          title: 'Error creating post',
          description: 'An error occurred while creating your post',
          type: 'error'
        })
      }
    }
  })

  const handleCreatepost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    return handleSubmit((data) => {
      createPostMutation.mutate({ data: { ...data, username: user.data!.username } })
    })(e)
  }

  return (
    <Flex className="@xl:max-w-3/5 w-full flex-col">
      <Head title="Posts feed" />

      <Card className="w-full ">
        <CardHeader>
          <CardTitle>
            <Flex className="w-full gap-2">
              <Balloon size={16} />
              What's on your mind?
            </Flex>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={handleCreatepost}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input id="title" autoComplete="off" placeholder="Some dummy title" {...register('title')} />
                  {errors.title && <span className="text-xs inline-block text-red-500">{errors.title.message}</span>}
                </Field>
                <Field>
                  <FieldLabel htmlFor="content">Content</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      id="bug-textarea"
                      placeholder="Some dummy content"
                      {...register('content')}
                      maxLength={createPostSchema.shape.content.maxLength ?? undefined}
                      className="max-h-[10vh] overflow-y-auto"
                    />
                    <InputGroupAddon align="block-end" className="flex flex-end">
                      <Flex className="w-full justify-end">
                        <InputGroupText>
                          {methods.watch('content').length ?? 0}/{createPostSchema.shape.content.maxLength}
                        </InputGroupText>
                      </Flex>
                    </InputGroupAddon>
                  </InputGroup>
                  {errors.content && (
                    <span className="text-xs inline-block text-red-500">{errors.content.message}</span>
                  )}
                </Field>

                {/* footer behavior */}
                <Flex className="justify-between">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button type="button" variant="link" onClick={() => methods.reset()}>
                        <RotateCcw />
                      </Button>
                    </TooltipTrigger>

                    <TooltipContent sideOffset={-16}>
                      <p>Clear form</p>
                    </TooltipContent>
                  </Tooltip>
                  <Button type="submit" disabled={isValidForm(errors) || createPostMutation.isPending}>
                    {createPostMutation.isPending ? <Spinner /> : 'Create Post'}
                  </Button>
                </Flex>
              </FieldGroup>

              <FieldGroup className="flex-row justify-between"></FieldGroup>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </Flex>
  )
}
