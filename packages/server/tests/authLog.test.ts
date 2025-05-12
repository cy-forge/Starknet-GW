import app from "../index";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { authLogsTable } from "../src/db/schema";
import { db } from "../src/utils/db"; // Your database connection
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { uuid } from "drizzle-orm/gel-core";


dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error(' JWT_SECRET environment variable is not defined');
    process.env.JWT_SECRET = 'test-secret-for-testing-only';
    console.warn('⚠ Using fallback test secret');
    }

    const generateToken = (role: string = 'admin') => {
      try {
          const token = jwt.sign(
          { id: '123', email: 'test@example.com', role },
          process.env.JWT_SECRET!,
          { expiresIn: '1h' }
          );
          console.log(` Generated ${role} token successfully`);
          return token;
      } catch (error) {
          console.error(' Failed to generate token:', error);
          throw error;
      }
    };

describe("AuthLogController", () => {
  beforeAll(async () => {
    // Set up database or mock data if needed
    await db.insert(authLogsTable).values({
      userId: "test-user-id",
      browser: "Chrome",
      ipAddress: "127.0.0.1",
      deviceType: "Desktop",
      deviceOs: "Windows",
      country: "US",
      date: "2025-05-05",
      isBot: false,
      isTunnel: false,
    });
  });

  afterAll(async () => {
    // Clean up database
    await db.delete(authLogsTable).where({ userId: "test-user-id" });
  });

  it("should create an auth log", async () => {
    const response = await app.request("/auth-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${generateToken()}`, // Mock a valid token
      },
      body: JSON.stringify({
        userId: "test-user-id",
        browser: "Firefox",
        ipAddress: "192.168.24.27",
        deviceType: "Mobile",
        deviceOS: "Android",
        date: "2025-05-05",
      }),
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Auth log created successfully");
  });

  it("should fetch auth logs", async () => {
    const response = await app.request("/auth-logs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${generateToken()}`, // Mock a valid token
      },
      query: {
        userId: "test-user-id",
        limit: 10,
        offset: 0,
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.logs).toBeDefined();
    expect(response.body.logs.length).toBeGreaterThan(0);
  });

  
  it("should fetch auth log by ID", async () => {
    const logId = "test-log-id"; // Replace with a valid log ID from your test data
    const response = await app.request(`/auth-log/${logId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${generateToken()}`, // Mock a valid token
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.log).toBeDefined();
    expect(response.body.log.id).toBe(logId);
  });
      .get("/auth-logs")
      .set("Authorization", "Bearer valid-token") // Mock a valid token
      .query({ userId: "test-user-id", limit: 10, offset: 0 });

    expect(response.status).toBe(200);
    expect(response.body.logs).toBeDefined();
    expect(response.body.logs.length).toBeGreaterThan(0);
  });

  it("should return 403 for unauthorized access", async () => {
    const response = await request(app)
      .get("/auth-logs")
      .set("Authorization", "Bearer invalid-token"); // Mock an invalid token

    expect(response.status).toBe(403);
    expect(response.body.error).toBe("Access Denied");
  });
});