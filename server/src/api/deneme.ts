import { Hono } from 'hono';

const deneme = new Hono();

deneme.get('/deneme', (c) => {
   return c.text('Deneme');
});

export default deneme;
