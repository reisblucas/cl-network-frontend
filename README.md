# CL Network Frontend App

## About

- Testing shadcn, MSW(Mock Service Worker) and MCP approach for the first time.
- Focused in creating a scalable architecture.
- MCP was used only at the end of project with Cursor.
- Foundational decisions was not delegated to AI, like folder structure, file patterns, Layout creation, etc.

## AI usage

Cursor with GPT/Sonnet 4 was only in the end of the project to:

- Connect shadcn MCP and discover the power that it gives to the agent. It was used to:
  - Adapt Sidebar to mobile;
  - Create NavUser;
  - Create from LandingRoute from scracth and discover what kinda type of landing page the AI would bring to me as prototype;
  - Refactor of `src/api/posts` to unify query, service and dto files in JUST one file, as it should be. Instead of a bunch of separated files.

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
- [x] Login & Register screen
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
  - [x] MSW in production as example
