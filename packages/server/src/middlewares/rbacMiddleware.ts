import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Next } from "hono";
import { createMiddleware } from 'hono/factory'

dotenv.config();

type JWTPayload = {
    role: string;
}

export const createRbacMiddleware = (allowedRoles: string[]) => {
  return createMiddleware(async (c: any, next: Next) => {
    const authHeader = c.req.header('Authorization');  
    if (!authHeader) {  
      return c.json({ error: 'Unauthorized' }, 401);  
    }  
  
    const token = authHeader.split(' ')[1];  
    if (!token) {  
      return c.json({ error: 'Unauthorized' }, 401);  
    }  

    try {
      const decoded: JWTPayload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
      const userRole = decoded.role;

      const hasAccess = allowedRoles.includes(userRole);

      if (!hasAccess) {
        return c.json({ error: 'Access Denied' }, 403);
      }

      c.set('user', decoded);

      await next();
    } catch (error) {
      return c.json({ error: 'Invalid token' }, 401);
    }
  });
};

// More further role based middlewares can be defined accordingly
export const rbacAdminMiddleware = createRbacMiddleware(['admin']);
