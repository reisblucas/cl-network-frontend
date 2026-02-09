import { env } from '@/infra/env'

export const enableMocking = async () => {
  if (env.ENABLE_API_MOCKING) {
    const { browserServiceWorker } = await import('./browser.ts')
    return browserServiceWorker.start()
  }
}
