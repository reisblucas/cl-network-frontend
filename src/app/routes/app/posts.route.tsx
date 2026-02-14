import { createPostSchema, type CreatePostDto } from '@/api/posts'
import { Flex } from '@/components/common'
import { isValidForm } from '@/components/common/inputs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Head } from '@/infra/common/seo'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Balloon, RotateCcw } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

export function PostsRoute() {
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

  return (
    <Flex className="@xl:max-w-3/5 w-full flex-col">
      <Head title="Posts feed" />

      <Flex>
        <Card className="w-full ">
          <CardHeader>
            <CardTitle>
              <Flex className="w-full gap-2">
                <Balloon />
                What's on your mind?
              </Flex>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit((data) => console.log('FORM DATA', data))}>
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
                    <Button type="submit" disabled={isValidForm(errors)}>
                      Create Post
                    </Button>
                  </Flex>
                </FieldGroup>

                <FieldGroup className="flex-row justify-between"></FieldGroup>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </Flex>
    </Flex>
  )
}
