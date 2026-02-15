import {
  createPostSchema,
  useCreatePostMutation,
  useDeletePostQuery,
  useGetPostByUserQuery,
  useUpdatePostQuery,
  type CreatePostDto
} from '@/api/posts'
import { useUser } from '@/auth'
import { Flex } from '@/components/common'
import { isValidForm } from '@/components/common/inputs'
import { useNotificationsStore } from '@/components/common/notifications'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Head } from '@/infra/common/seo'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useQueryClient } from '@tanstack/react-query'
import { Balloon, Pencil, RotateCcw, Save, Trash, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export function PostsRoute() {
  const user = useUser()
  const [selectedPostId, setSelectedPostId] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [editFormDefaultValue, setEditFormDefaultValue] = useState<Omit<CreatePostDto, 'username'>>({
    title: '',
    content: ''
  })

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

  const queryClient = useQueryClient()
  const notifications = useNotificationsStore()
  const createPostMutation = useCreatePostMutation({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          title: 'Post created successfully',
          description: 'Your post has been created successfully',
          type: 'success'
        })
        queryClient.invalidateQueries({ queryKey: ['my-posts'] })
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

  // fetch posts
  const getPostsMutation = useGetPostByUserQuery({
    mutationConfig: {
      onSuccess: () => {
        console.log('data')
      }
    }
  })

  const deletePostMutation = useDeletePostQuery({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          title: 'Post deleted successfully',
          type: 'success'
        })
        queryClient.invalidateQueries({ queryKey: ['my-posts'] })
        setSelectedPostId('')
      }
    }
  })

  // edit
  const updatePostMutation = useUpdatePostQuery({
    mutationConfig: {
      onSuccess: () => {
        notifications.addNotification({
          title: 'Post updated successfully',
          type: 'success'
        })
        queryClient.invalidateQueries({ queryKey: ['my-posts'] })
        setIsEditing(false)
      }
    }
  })
  const editPostForm = useForm<Omit<CreatePostDto, 'username'>>({
    defaultValues: editFormDefaultValue,
    resolver: standardSchemaResolver(createPostSchema.omit({ username: true }))
  })
  const {
    handleSubmit: handleEditPostSubmit,
    register: editPostRegister,
    formState: { errors: editPostErrors }
  } = editPostForm
  const handleEditPost = (postId: string) => {
    if (selectedPostId !== postId) {
      editPostForm.reset()
    }
    setIsEditing(true)
    setSelectedPostId(postId)
    const defaultValues = getPostsMutation.data?.data.find((p) => p.id === postId)

    if (defaultValues) {
      setEditFormDefaultValue({ title: defaultValues?.title, content: defaultValues?.content })
    }
  }

  const handleCancelEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsEditing(false)
    setSelectedPostId('')
    // editPostForm.reset()
    // setEditFormDefaultValue({ title: '', content: '' })
  }
  // end edit

  useEffect(
    function editFormDefaultValueEffect() {
      editPostForm.reset(editFormDefaultValue)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editFormDefaultValue]
  )

  return (
    <Flex className="@xl:max-w-3/5 w-full flex-col gap-4">
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
                  <FieldLabel htmlFor="bug-textarea">Content</FieldLabel>
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

      {/* my posts */}
      {getPostsMutation.data && getPostsMutation.data?.data.length > 0 ? (
        <Flex className="flex-col gap-4">
          {getPostsMutation.data?.data.map((post) => {
            if (isEditing && selectedPostId === post.id) {
              return (
                <Card key={post.id}>
                  <FormProvider {...editPostForm}>
                    <form
                      className="flex flex-col gap-4"
                      // onSubmit={handleEditPostSubmit((data) => editPostMutation.mutate({ id: post.id, data })}
                    >
                      <CardHeader className="flex flex-col w-full">
                        {/* <CardTitle>{post.title}</CardTitle> */}
                        <CardTitle className="w-full flex items-center">
                          <FieldGroup>
                            <Field>
                              <FieldLabel htmlFor="edit-title">Title</FieldLabel>
                            </Field>
                          </FieldGroup>

                          <CardAction className="contents">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="submit"
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleEditPostSubmit((data) =>
                                      updatePostMutation.mutate({ postId: selectedPostId, post: data })
                                    )()
                                  }}
                                >
                                  <Save className="size-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent sideOffset={-16}>
                                <p>Save</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    editPostForm.reset({ title: '', content: '' })
                                  }}
                                >
                                  <RotateCcw className="size-4" />
                                </Button>
                              </TooltipTrigger>

                              <TooltipContent sideOffset={-16}>
                                <p>Reset form</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipContent sideOffset={-16}>
                                <p>Cancel</p>
                              </TooltipContent>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                                  <X className="size-4" />
                                </Button>
                              </TooltipTrigger>
                            </Tooltip>
                          </CardAction>
                        </CardTitle>

                        <Field>
                          <Input
                            id="edit-title"
                            autoComplete="off"
                            placeholder="Some dummy edit title"
                            {...editPostRegister('title')}
                            maxLength={createPostSchema.shape.title.maxLength ?? undefined}
                          />
                          {editPostErrors.title && (
                            <span className="text-xs inline-block text-red-500">{editPostErrors.title.message}</span>
                          )}
                        </Field>
                      </CardHeader>
                      <CardContent>
                        <FieldGroup>
                          <Field>
                            <FieldLabel htmlFor="edit-content">Content</FieldLabel>
                            <InputGroup>
                              <InputGroupTextarea
                                id="edit-content"
                                autoComplete="off"
                                placeholder="Some dummy content"
                                {...editPostRegister('content')}
                                maxLength={createPostSchema.shape.content.maxLength ?? undefined}
                                className="max-h-[20vh]"
                              />

                              <InputGroupAddon align="block-end" className="flex flex-end">
                                <Flex className="w-full justify-end">
                                  <InputGroupText>
                                    {editPostForm.watch('content').length ?? 0}/
                                    {createPostSchema.shape.content.maxLength}
                                  </InputGroupText>
                                </Flex>
                              </InputGroupAddon>
                            </InputGroup>
                            {editPostErrors.content && (
                              <span className="text-xs inline-block text-red-500">
                                {editPostErrors.content.message}
                              </span>
                            )}
                          </Field>
                        </FieldGroup>
                      </CardContent>
                    </form>
                  </FormProvider>
                </Card>
              )
            }

            return (
              <Card key={post.id} className="max-h-[30vh]">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardAction>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedPostId(post.id)}>
                          <Trash className="size-4" />
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
                          <DialogDescription>
                            <p>
                              Post ID: <span className="font-semibold italic">{post.id}</span>
                            </p>
                            <p>
                              Title: <span className="font-semibold italic">{post.title}</span>
                            </p>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="secondary" onClick={() => setSelectedPostId('')}>
                              Cancel
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant="destructive" onClick={() => deletePostMutation.mutate({ id: post.id })}>
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Button variant="ghost" size="icon" onClick={() => handleEditPost(post.id)}>
                      <Pencil className="size-4" />
                    </Button>
                  </CardAction>
                </CardHeader>

                <Separator />
                <CardContent className="max-h-[20vh] overflow-y-auto">
                  <CardDescription>{post.content}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </Flex>
      ) : (
        // No data card
        <Card>
          <CardContent className="flex justify-center items-center">
            <p>No posts found</p>
          </CardContent>
        </Card>
      )}
    </Flex>
  )
}
