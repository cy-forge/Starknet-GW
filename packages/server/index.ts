import { Hono } from "hono";
import { rbacAdminMiddleware } from "./src/middlewares/rbacMiddleware";
import { cors } from 'hono/cors'
import authController from "./src/controllers/authController";
import { initializeDB } from "./src/utils/db";

const app = new Hono();

// Initialize database
initializeDB();

app.use('*', cors());

/**
 * Utilize the relevant middlewares in each request definition
 * Example: app.get('/api/get-tokens', userMiddleware, controller) where userMiddleware can
 * be defined using `createRbacMiddleware`.
 *  */ 

app.route('/auth', authController);
app.get('/', (c) => c.text("hello"));

export default app;
