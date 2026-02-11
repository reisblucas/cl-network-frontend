import {
  BIOGRAPHY,
  FIRST_NAME,
  HAS_SPECIAL_CHARACTER_REGEX,
  LAST_NAME,
  PASSWORD,
  SPECIAL_CHARACTERS_NOT_ALLOWED
} from '@/domain/validation'
import z from 'zod'

export const BASE_EMAIL_SCHEMA = z.email('Invalid email').nonempty().nonoptional('Email is required')
export const BASE_PASSWORD_SCHEMA = z.string().min(PASSWORD.min, 'Password is required')
export const BASE_USERNAME_SCHEMA = z
  .string()
  .min(3, 'Username is required')
  .refine(
    (data) => !SPECIAL_CHARACTERS_NOT_ALLOWED.test(data),
    'Username can only contain letters, numbers, and underscores'
  )

// Credential schema is the same between OWNER and CANDIDATE
const registerPasswordSchema = z
  .string()
  .min(PASSWORD.min, `Password must contain at least ${PASSWORD.min} characters`)
  .max(PASSWORD.max, `Password must contain at least ${PASSWORD.max} characters`)
  .trim()
  .regex(/[A-Z]/, {
    error: 'At least 1 uppercase character is required'
  })
  .regex(/[a-z]/, {
    error: 'At least 1 lowercase character is required'
  })
  .regex(/\d/, {
    error: 'At least 1 digit character is required'
  })
  .regex(HAS_SPECIAL_CHARACTER_REGEX, {
    error: 'At least 1 special character is required'
  })
  .nonempty()
  .nonoptional()

export const loginInputSchema = z
  .object({
    login: z.string().min(3, 'Inform your email or username'),
    password: BASE_PASSWORD_SCHEMA
  })
  .strict()
  .superRefine((data, ctx) => {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.login)
    if (!isEmail) {
      // validate
      const isInvalidUsername = HAS_SPECIAL_CHARACTER_REGEX.test(data.login) // if not have  special character, it is valid

      if (isInvalidUsername) {
        ctx.addIssue({
          path: ['login'],
          message: 'Invalid username',
          code: 'custom'
        })

        return
      }
    } else {
      const emailResult = BASE_EMAIL_SCHEMA.safeParse(data.login)
      if (!emailResult.success) {
        ctx.addIssue({
          path: ['login'],
          message: 'Invalid email',
          code: 'custom'
        })
      }
    }

    // validate email
  })
export type LoginInput = z.infer<typeof loginInputSchema>

export const registerInputSchema = z
  .object({
    email: BASE_EMAIL_SCHEMA,
    password: registerPasswordSchema,
    password_confirmation: z.string().max(PASSWORD.max, 'Password must be less than 128 characters').nonoptional(),
    username: BASE_USERNAME_SCHEMA,
    first_name: z
      .string()
      .min(FIRST_NAME.min, 'First name is required')
      .max(FIRST_NAME.max, `First name must be less than ${FIRST_NAME.max} characters`),
    last_name: z
      .string()
      .min(LAST_NAME.min, 'First name is required')
      .max(LAST_NAME.max, `Last name must be less than ${LAST_NAME.max} characters`),
    bio: z.string().trim().max(BIOGRAPHY.max, `Bio must be less than ${BIOGRAPHY.max} characters`).optional()
  })
  .strict()
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation']
  })
export type RegisterInput = z.infer<typeof registerInputSchema>
