import React from 'react'
import { useUser } from './auth.config'
import type { RoleTypes } from './auth.contract'

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
