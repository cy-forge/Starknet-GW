import { Hono } from "hono";
import { isAuthenticated } from "../middlewares/authMiddleware";
import userService from "../services/userService";
import { IPasswordChange } from "../interfaces/userInterfaces";

const userController = new Hono();

/**
 * View Profile - Get the currently logged-in user's profile
 */
userController.get("/profile", isAuthenticated, async (c) => {
  try {
    const userId = c.get("userId");

    const user = await userService.getUserProfile(userId);

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(
      {
        message: "Profile retrieved successfully",
        user,
      },
      200
    );
  } catch (error) {
    console.error("Error retrieving profile:", error);
    return c.json({ error: "Failed to retrieve profile" }, 500);
  }
});

/**
 * Change Password - Allow users to change their password
 */
userController.patch("/change-password", isAuthenticated, async (c) => {
  try {
    const userId = c.get("userId");
    const passwordData = (await c.req.json()) as IPasswordChange;

    await userService.changePassword(userId, passwordData);

    return c.json(
      {
        message: "Password changed successfully",
      },
      200
    );
  } catch (error: any) {
    console.error("Error changing password:", error);

    // Handle specific error types with appropriate status codes
    if (
      error.message === "All fields are required" ||
      error.message === "New password and confirmation do not match"
    ) {
      return c.json({ error: error.message }, 400);
    } else if (error.message === "Current password is incorrect") {
      return c.json({ error: error.message }, 401);
    } else if (error.message === "User not found") {
      return c.json({ error: error.message }, 404);
    }

    return c.json({ error: "Failed to change password" }, 500);
  }
});

export default userController;
