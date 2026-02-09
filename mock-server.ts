import express from 'express'
import cors from 'cors'
import logger from 'pino-http'

import { env } from './src/infra/env'

const app = express()
app.use(
  cors({
    origin: env.APP_URL,
    credentials: true
  })
)

app.use(express.json())
app.use(logger())

app.lister(env.APP_MOCK_API_PORT, () => {
  console.log(`Mock API server started at http://localhost:${env.APP_MOCK_API_PORT}`)
})
