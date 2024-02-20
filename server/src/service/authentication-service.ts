import { decode, sign, verify } from 'hono/jwt';
import { HTTPException } from 'hono/http-exception';
import client from '../database';
import Crypto from 'crypto';

type ReturnTokens = {
   access_token: string;
   refresh_token: string;
};

export class AuthenticationService {
   constructor() {}

   public async login(email: string, password: string): Promise<ReturnTokens> {
      const hashPassword = Crypto.createHash('sha256')
         .update(password)
         .digest('base64');
      const text = `SELECT * FROM users WHERE email = $1 and password = $2`;
      const result = await client.query(text, [email, hashPassword]);
      if (result.rows.length === 0) {
         throw new HTTPException(400, { message: 'User not found!' });
      }
      const user = result.rows[0];

      const payload = {
         id: user.id,
         email: user.email,
      };
      const accessToken = await sign(payload, 'secret_key', 'HS256');
      const refreshToken = await sign(payload, 'secret_key', 'HS256');
      return { access_token: accessToken, refresh_token: refreshToken };
   }

   public async register(payload: {
      email: string;
      password: string;
   }): Promise<string> {
      console.log(payload);

      const text = `INSERT INTO users(email, password) VALUES ($1, $2)`;
      try {
         const hashPassword = Crypto.createHash('sha256')
            .update(payload.password)
            .digest('base64');
         await client.query(text, [payload.email, hashPassword]);
         return 'Account created.';
      } catch (error) {
         console.log(error);

         throw new HTTPException(500, { message: 'Database error!' });
      }
   }
}
