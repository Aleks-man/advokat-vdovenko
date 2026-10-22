import pg from 'pg'
import { env } from '../config/env.js'
let pool: pg.Pool | undefined
export function getPool() {
  if (!env.databaseUrl) throw new Error('DATABASE_URL is required for database features')
  return pool ??= new pg.Pool({ connectionString: env.databaseUrl, max: 5 })
}
