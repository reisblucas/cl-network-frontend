import type { Comment, User } from '@/auth'

export const POLICIES_COMMENT = {
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
