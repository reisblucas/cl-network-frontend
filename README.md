# CL Network Frontend App

## About

- Testing shadcn and for the first time, msw and creating a scalable architecture.

## Roadmap

- [ ] Minimal setup
  - [x] vite
  - [x] react
  - [x] react-helmet
  - [x] react-query
  - [x] react-query-auth
  - [x] react-hook-form
  - [x] react-router v7
  - [x] eslint
  - [ ] dayjs setup
  - [x] shadcn/ui
  - [x] tailwind
  - [x] usehooks-ts
  - [x] zod
  - [x] zustand
  - [x] msw - mock app calls
  - [x] msw setup to work
- [ ] Login & Register screen
  - [x] error show/handlers
  - [x] debounce /users/email validation
  - [ ] api & services & api state
    - [x] auth
      - [x] react-query-auth config
      - [x] POST /auth/login
      - [x] POST /auth/register
      - [x] GET /auth/me
      - [x] POST /auth/logout
    - [ ] users
      - [x] GET /users/email
      - [ ] PATCH /users/settings
    - [ ] GET /posts - All posts to compose the feed
    - [x] GET /posts/my-posts - BY USERNAME
    - [x] DELETE /posts/:postId
    - [x] PATCH /posts/:postId
- [x] Deploy
  - [x] Vercel

---

## AI usage

Only in the end of the project. Using mcp from shadcn-ui: Mobile Sidebar, NavUser, LandingRoute and unification of src/api/posts into query, service and dto files instead of a bunch of separated files, as it should be.
