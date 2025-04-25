import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Next } from "hono";
import { createMiddleware } from "hono/factory";
import { IJWTPayload } from "../interfaces/authInterfaces";

dotenv.config();

// Declare module to extend Hono's Context
declare module "hono" {
  interface ContextVariableMap {
    userId: string;
  }
}

/**
 * Authentication middleware that verifies JWT tokens and extracts user information
 * Sets the userId in the context for use in route handlers
 */
export const isAuthenticated = createMiddleware(async (c, next) => {
  try {
    // Get the JWT token from the Authorization header
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized - No token provided" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as IJWTPayload;

    // Set the user ID in the context for use in the route handlers
    if (payload && payload.id) {
      c.set("userId", payload.id);
    } else {
      throw new Error("Invalid token payload");
    }

    await next();
  } catch (error) {
    console.error("Auth error:", error);
    return c.json({ error: "Unauthorized - Invalid token" }, 401);
  }
});
