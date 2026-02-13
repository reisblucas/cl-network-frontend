import * as z from 'zod'

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string(),
    ENABLE_API_MOCKING: z
      .string()
      .refine((s) => s === 'true' || s === 'false')
      .transform((s) => s === 'true')
      .optional(),
    APP_URL: z.string().optional().default('http://localhost:3000'),
    MOCK_API_PORT: z.string().optional().default('8080'),
    //
    CLN_API_URL: z.string()
  })

  const envVars = Object.entries(import.meta.env).reduce<Record<string, string>>((acc, curr) => {
    const [key, value] = curr
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value
    }
    return acc
  }, {})

  const parsedEnv = EnvSchema.safeParse(envVars)

  if (!parsedEnv.success) {
    const maperror = Object.entries(parsedEnv.error.flatten().fieldErrors)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n')

    throw new Error(
      `Invalid env provided.
      The following variables are missing or invalid:
      ${maperror}
      `
    )
  }

  return parsedEnv.data
}

export const env = createEnv()
