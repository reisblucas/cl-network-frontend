export const paths = {
  home: {
    path: '/',
    getHref: () => '/'
  },

  auth: {
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
    },
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`
    }
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app'
    },
    posts: {
      path: '/app/posts',
      getHref: () => '/app/posts'
    },
    post: {
      path: '/app/posts/:postId',
      getHref: (id: string) => `/app/posts/${id}`
    }
  }
} as const
