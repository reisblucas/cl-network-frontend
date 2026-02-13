import z from 'zod'

export const updatePostSchema = z
  .object({
    title: z.string().nonempty().nonoptional(),
    content: z.string().nonempty().nonoptional()
  })
  .strict()
