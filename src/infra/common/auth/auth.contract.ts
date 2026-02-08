import type { Entity } from '@/infra/__types__/api.type'

export type Roles = 'ADMIN' | 'USER'

export type UserRegister = {
  first_name: string
  last_name: string
  email: string
  username: string
  bio: string
}

export type UserResponse = Entity<UserRegister & { role: Roles }>

export type AuthResponse = {
  user: UserResponse
  jwt: string
}
