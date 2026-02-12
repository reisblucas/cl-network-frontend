import { authHandlers } from './auth.msw'
import { usersHandlers } from './users.msw'

export const handlers = [...authHandlers, ...usersHandlers]
