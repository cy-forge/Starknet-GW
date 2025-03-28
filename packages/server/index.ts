import { Hono } from "hono";
import rbacMiddleware from "./src/middlewares/rbacMiddleware";
import { cors } from 'hono/cors'
import * as dotenv from 'dotenv';

dotenv.config();

const app = new Hono();

app.use('*', cors());
app.use('/api', rbacMiddleware)

app.get('/', (c) => c.text("hello"));

export default app;
