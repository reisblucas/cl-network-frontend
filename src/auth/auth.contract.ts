import type { Entity } from '@/infra/__types__'

export type RoleTypes = 'ADMIN' | 'USER'

// base will be usable in Registration Api
export type UserRegister = {
  first_name: string
  last_name: string
  email: string
  username: string
  bio: string
}

export type User = Entity<UserRegister & { role: RoleTypes }>

export type AuthResponse = {
  user: User
  jwt: string
}

export type Comment = Entity<{
  body: string
  discussionId: string
  author: User
}>
