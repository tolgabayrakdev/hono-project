import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import denemeRouter from './routes/deneme-routes'


const app = new Hono()

app.use(logger())


app.route("/api/v1", denemeRouter);

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
