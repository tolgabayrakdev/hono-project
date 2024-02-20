import { Hono } from 'hono';
import { AuthenticationService } from '../service/authentication-service';
import { deleteCookie, setCookie } from 'hono/cookie';

const authenticaton = new Hono();
const authenticationService = new AuthenticationService();

authenticaton.post('/login', async (c): Promise<any> => {
   const body = await c.req.json();
   const tokens = await authenticationService.login(body.email, body.password);
   setCookie(c, 'access_token', tokens.access_token, {
      httpOnly: true,
   });
   setCookie(c, 'refresh_token', tokens.refresh_token, {
      httpOnly: true,
   });
   return c.json({ tokens: tokens }, 200);
});

authenticaton.post('/register', async (c): Promise<any> => {
   const body = await c.req.json();
   const data = await authenticationService.register(body);
   return c.json({ message: data }, 201);
});

authenticaton.post('/logout', async (c) => {
   deleteCookie(c, 'access_token');
   deleteCookie(c, 'refresh_token');
   return c.json({ message: 'Log out successful.' });
});

export default authenticaton;
