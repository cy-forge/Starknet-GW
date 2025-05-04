import app from "../index";
import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { db } from "../src/utils/db";
import { categoriesTable } from "../src/db/schema";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';




dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET environment variable is not defined');
    process.env.JWT_SECRET = 'test-secret-for-testing-only';
    console.warn('⚠️ Using fallback test secret');
    }

    const generateToken = (role: string = 'admin') => {
    try {
        const token = jwt.sign(
        { id: '123', email: 'test@example.com', role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
        );
        console.log(`✅ Generated ${role} token successfully`);
        return token;
    } catch (error) {
        console.error('❌ Failed to generate token:', error);
        throw error;
    }
};

describe("Category API", () => {
    let testCategoryId: string;
    const adminToken = generateToken('admin');
    const userToken = generateToken('user');

    // Print tokens for debugging (remove in production)
    console.log('Admin token:', adminToken);
    console.log('User token:', userToken);

    // Clean up after tests
    afterAll(async () => {
        try {
        await db.delete(categoriesTable);
        console.log('✅ Cleaned up test data');
        } catch (error) {
        console.error('❌ Failed to clean up test data:', error);
        }
    });

    it("should create a new category with admin token", async () => {
        const res = await app.request("/api/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${adminToken}`
        },
        body: JSON.stringify({
            name: "Test Category",
            status: "active"
        })
        });

        expect(res.status).toBe(201);
        const category = await res.json();
        expect(category.name).toBe("Test Category");
        expect(category.slug).toBe("test-category");
        expect(category.status).toBe("active");
        
        // Save the ID for future tests
        testCategoryId = category.id;
    });

    it("should not allow creation with user token", async () => {
        const res = await app.request("/api/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify({
            name: "User Test Category",
            status: "active"
        })
        });

        expect(res.status).toBe(403);
    });

    it("should get all categories", async () => {
        const res = await app.request("/api/categories", {
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
        });

        expect(res.status).toBe(200);
        const categories = await res.json();
        expect(Array.isArray(categories)).toBe(true);
        expect(categories.length).toBeGreaterThan(0);
    });

    it("should get a category by ID", async () => {
        const res = await app.request(`/api/categories/${testCategoryId}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
        });

        expect(res.status).toBe(200);
        const category = await res.json();
        expect(category.id).toBe(testCategoryId);
        expect(category.name).toBe("Test Category");
    });

    it("should update a category with admin token", async () => {
        const res = await app.request(`/api/categories/${testCategoryId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${adminToken}`
        },
        body: JSON.stringify({
            name: "Updated Test Category",
            status: "inactive"
        })
        });

        expect(res.status).toBe(200);
        const category = await res.json();
        expect(category.name).toBe("Updated Test Category");
        expect(category.slug).toBe("updated-test-category");
        expect(category.status).toBe("inactive");
    });

    it("should not allow update with user token", async () => {
        const res = await app.request(`/api/categories/${testCategoryId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify({
            name: "User Updated Category"
        })
        });

        expect(res.status).toBe(403);
    });

    it("should delete a category with admin token", async () => {
        const res = await app.request(`/api/categories/${testCategoryId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${adminToken}`
        }
        });

        expect(res.status).toBe(200);
        
        // Verify it's deleted
        const checkRes = await app.request(`/api/categories/${testCategoryId}`, {
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
        });
        
        expect(checkRes.status).toBe(404);
    });
});