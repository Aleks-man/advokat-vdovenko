import 'dotenv/config'
const port = Number(process.env.PORT ?? 3001)
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT')
export const env = { port, databaseUrl: process.env.DATABASE_URL }
