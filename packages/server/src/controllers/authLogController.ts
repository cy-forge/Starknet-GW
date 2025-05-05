import { Hono } from "hono";
// import {}
import { logAuthAttempt, getAuthLogs, getAuthLogById, deleteAuthLog, updateAuthLog, getAuthLogsByDate} from "../services/authLogService";


const authLogController = new Hono();

authLogController.post("/auth-log", async (c) => {
    try {
        const { userId, browser, ipAddress, deviceType, deviceOS, country, date, isBot, isTunnel } = await c.req.json();

        if (!userId || !browser || !ipAddress || !deviceType || !deviceOS || !country || !date) {
            return c.json({ error: "All fields are required" }, 400);
        }

        await logAuthAttempt(userId, browser, ipAddress, deviceType, deviceOS, country, date, isBot, isTunnel);

        return c.json({ message: "Auth log created successfully" }, 201);
    }
    catch (error) {
        console.error("Error creating auth log:", error);
        return c.json({ error: "Failed to create auth log" }, 500);
    }
});

authLogController.get("/auth-logs", async (c) => {
    try {
        const { userId, limit = 10, offset = 0 } = c.req.query();

        if (!userId) {
            return c.json({ error: "User ID is required" }, 400);
        }

        const logs = await getAuthLogs(userId, Number(limit), Number(offset));

        return c.json({ logs }, 200);
    }
    catch (error) {
        console.error("Error fetching auth logs:", error);
        return c.json({ error: "Failed to fetch auth logs" }, 500);
    }
});

authLogController.get("/auth-log/:logId", async (c) => {
    try {
        const { logId } = c.req.param();

        if (!logId) {
            return c.json({ error: "Log ID is required" }, 400);
        }

        const log = await getAuthLogById(logId);

        if (!log) {
            return c.json({ error: "Auth log not found" }, 404);
        }

        return c.json({ log }, 200);
    }
    catch (error) {
        console.error("Error fetching auth log by ID:", error);
        return c.json({ error: "Failed to fetch auth log by ID" }, 500);
    }
});

authLogController.delete("/auth-log/:logId", async (c) => {
    try {
        const { logId } = c.req.param();

        if (!logId) {
            return c.json({ error: "Log ID is required" }, 400);
        }

        await deleteAuthLog(logId);

        return c.json({ message: "Auth log deleted successfully" }, 200);
    }
    catch (error) {
        console.error("Error deleting auth log:", error);
        return c.json({ error: "Failed to delete auth log" }, 500);
    }
});

authLogController.patch("/auth-log/:logId", async (c) => {
    try {
        const { logId } = c.req.param();
        const updateData = await c.req.json();

        if (!logId) {
            return c.json({ error: "Log ID is required" }, 400);
        }

        await updateAuthLog(logId, updateData);

        return c.json({ message: "Auth log updated successfully" }, 200);
    }
    catch (error) {
        console.error("Error updating auth log:", error);
        return c.json({ error: "Failed to update auth log" }, 500);
    }
});

authLogController.get("/auth-logs/date", async (c) => {
    try {
        const { userId, date, limit = 10, offset = 0 } = c.req.query();

        if (!userId || !date) {
            return c.json({ error: "User ID and date are required" }, 400);
        }

        const logs = await getAuthLogsByDate(userId, date, Number(limit), Number(offset));

        return c.json({ logs }, 200);
    }
    catch (error) {
        console.error("Error fetching auth logs by date:", error);
        return c.json({ error: "Failed to fetch auth logs by date" }, 500);
    }
});
export default authLogController;
