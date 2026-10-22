import express from 'express'
import helmet from 'helmet'
import { healthRouter } from './routes/health.js'
export const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(express.json({ limit: '16kb' }))
app.use('/api/health', healthRouter)
app.use((_req, res) => { res.status(404).json({ error: 'Not found' }) })
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = error instanceof SyntaxError ? 400 : 500
  res.status(status).json({ error: status === 400 ? 'Invalid JSON' : 'Internal server error' })
})
