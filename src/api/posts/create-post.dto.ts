import z from 'zod'

export const createPostSchema = z
  .object({
    username: z.string().nonempty(),
    title: z.string().nonempty(),
    content: z.string().nonempty()
  })
  .strict()
export type CreatePostDto = z.infer<typeof createPostSchema>
