import React from 'react'
import type { Comment, RoleTypes, User } from '../auth.contract'
import { useUser } from '../auth.config'

export const POLICIES = {
  'comment:delete': (user: User, comment: Comment) => {
    if (user.role === 'ADMIN') {
      return true
    }

    if (user.role === 'USER' && comment.author?.id === user.id) {
      return true
    }

    return false
  }
}

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode
  children: React.ReactNode
} & (
  | {
      allowedRoles: RoleTypes[]
      policyCheck?: never
    }
  | {
      allowedRoles: never[]
      policyCheck?: boolean
    }
)

// hook
export const useAuthorization = () => {
  const user = useUser()

  if (!user.data) {
    throw Error('User does not exists!')
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0 && user.data) {
        return allowedRoles?.includes(user.data.role)
      }

      return false
    },
    [user.data]
  )

  return { checkAccess, role: user.data.role }
}
// end hook

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization()
  let canAccess = false

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles })
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck
  }

  return <>{canAccess ? children : forbiddenFallback}</>
}
