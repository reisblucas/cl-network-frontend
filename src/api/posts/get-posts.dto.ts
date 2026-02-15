import z from 'zod'
import { createPostSchema } from './create-post.dto'

export const getPostSchema = z.array(
  z
    .object({
      // id: z.number().nonnegative().nonoptional(),
      id: z.string().nonempty().nonoptional(),
      ...createPostSchema.shape,
      created_datetime: z.iso.date().nonempty().nonoptional(),
      author_ip: z.string().nonempty().nonoptional() // TODO: validate ip address with Regex
    })
    .strict()
)
// metadata: z.object({
//   count: z.number().nonnegative().nonoptional(),
//   next: z.number().nonnegative().nullable(),
//   previous: z.number().nonnegative().nullable(),
//   limit: z.number().nonnegative().nonoptional(),
//   page: z.number().nonnegative().nonoptional()
// })
// })
export type GetPostsDto = z.infer<typeof getPostSchema>
