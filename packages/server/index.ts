import { Hono } from "hono";
import rbacMiddleware from "./src/middlewares/rbacMiddleware";
import { cors } from 'hono/cors'
import authController from "./src/controllers/authController";
import { initializeDB } from "./src/utils/db";

const app = new Hono();

// Initialize database
initializeDB();

app.use('*', cors());
app.use('/api', rbacMiddleware)

app.route('/auth', authController);
app.get('/', (c) => c.text("hello"));

export default app;
