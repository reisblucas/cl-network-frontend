import z from 'zod'

export const createPostSchema = z
  .object({
    username: z.string().nonempty(),
    title: z.string().nonempty().max(128),
    content: z.string().nonempty().max(1024)
  })
  .strict()
export type CreatePostDto = z.infer<typeof createPostSchema>

export const getPostSchema = z.array(
  z
    .object({
      id: z.string().nonempty().nonoptional(),
      ...createPostSchema.shape,
      created_datetime: z.iso.date().nonempty().nonoptional(),
      author_ip: z.string().nonempty().nonoptional()
    })
    .strict()
)
export type GetPostsDto = z.infer<typeof getPostSchema>

export const updatePostSchema = z
  .object({
    title: z.string().nonempty().nonoptional(),
    content: z.string().nonempty().nonoptional()
  })
  .strict()
export type UpdatePostDto = z.infer<typeof updatePostSchema>
