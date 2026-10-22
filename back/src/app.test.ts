import { test } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { app } from './app.js'
test('health works without database', async () => { const response = await request(app).get('/api/health'); assert.equal(response.status, 200); assert.equal(response.body.status, 'ok'); assert.equal(response.headers['x-powered-by'], undefined) })
test('unknown endpoints return JSON 404', async () => { const response = await request(app).get('/api/missing'); assert.equal(response.status, 404); assert.equal(response.body.error, 'Not found') })
