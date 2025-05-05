import * as bcrypt from "bcrypt";
import { db } from "../utils/db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { IPasswordChange, IUserProfile } from "../interfaces/userInterfaces";

class UserService {
  async getUserProfile(userId: string): Promise<IUserProfile | null> {
    try {
      const result = await db
        .select({
          id: usersTable.id,
          email: usersTable.email,
          role: usersTable.role,
          mfaEnabled: usersTable.mfaEnabled,
          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      return result[0] || null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  }

  async changePassword(
    userId: string,
    passwordData: IPasswordChange
  ): Promise<boolean> {
    const { oldPassword, newPassword, confirmPassword } = passwordData;

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      throw new Error("New password and confirmation do not match");
    }

    try {
      // Get the user from the database
      const result = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      const user = result[0];

      if (!user) {
        throw new Error("User not found");
      }

      // Verify the old password
      const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
      if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
      }

      // Hash the new password
      const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

      // Update the password in the database
      await db
        .update(usersTable)
        .set({
          password: hashedNewPassword,
          updatedAt: new Date(),
        })
        .where(eq(usersTable.id, userId));

      return true;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  }
}

export default new UserService();
