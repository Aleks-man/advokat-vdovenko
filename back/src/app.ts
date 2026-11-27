import express from 'express'
import helmet from 'helmet'
import { healthRouter } from './routes/health.js'
export const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(express.json({ limit: '16kb' }))
app.use('/api/health', healthRouter)
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})
app.use(
  (error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof Error && 'type' in error) {
      if (error.type === 'entity.too.large') {
        res.status(413).json({ error: 'Payload too large' })
        return
      }
      if (error.type === 'entity.parse.failed') {
        res.status(400).json({ error: 'Invalid JSON' })
        return
      }
    }
    res.status(500).json({ error: 'Internal server error' })
  },
)
