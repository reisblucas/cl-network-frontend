import { env } from '@/infra/env'

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { browserServiceWorker } = await import('./browser.ts')
    const { initializeDb } = await import('./db.ts')
    await initializeDb()
    console.log('Database initialized')
    return browserServiceWorker.start()
  }
}
