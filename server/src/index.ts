import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

//Routers
import deneme from './api/deneme';
import authentication from "./api/authentication";


const app = new Hono();

app.use(logger());
app.use("*", cors({ origin: "*", credentials: true }))

app.route('/api/v1', deneme);
app.route('/api/v1/authentication', authentication);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
   fetch: app.fetch,
   port,
});
