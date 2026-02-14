import z from 'zod'

export const createPostSchema = z
  .object({
    username: z.string().nonempty(),
    title: z.string().nonempty().max(128),
    content: z.string().nonempty().max(1024)
  })
  .strict()
export type CreatePostDto = z.infer<typeof createPostSchema>
