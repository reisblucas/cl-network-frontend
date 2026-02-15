import { authHandlers } from './auth.msw'
import { postsHandlers } from './posts.msw'
import { usersHandlers } from './users.msw'

export const handlers = [...authHandlers, ...usersHandlers, ...postsHandlers]
