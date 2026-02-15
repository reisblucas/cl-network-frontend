import z from 'zod'
import { createPostSchema } from './create-post.dto'

export const getPostSchema = z
  .object({
    count: z.number().nonnegative().nonoptional(),
    next: z.number().nonnegative().nullable(),
    previous: z.number().nonnegative().nullable(),
    results: z.array(
      z
        .object({
          id: z.number().nonnegative().nonoptional(),
          ...createPostSchema.shape,
          created_datetime: z.iso.date().nonempty().nonoptional(),
          author_ip: z.string().nonempty().nonoptional() // TODO: validate ip address with Regex
        })
        .strict()
    )
  })
  .strict()
export type GetPostsDto = z.infer<typeof getPostSchema>
