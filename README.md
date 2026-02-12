# React + TypeScript + Vite

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
    - [ ] auth
      - [x] react-query-auth config
      - [x] /auth/login
      - [x] /auth/register
      - [x] /auth/me
      - [ ] /auth/logout
    - [ ] users
      - [x] /users/email
    - [ ] GET /posts
    - [ ] DELETE /post/:postId
    - [ ] PATCH /post/:postId
- [ ] Deploy
  - [ ] Vercel

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
      // other options...
    }
  }
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname
      }
      // other options...
    }
  }
])
```
