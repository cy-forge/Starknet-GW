import { Hono } from "hono";
import * as bcrypt from 'bcrypt';
import { generateSecret, verifyMFAToken } from "../services/authService";
import * as jwt from 'jsonwebtoken';
import { db } from "../utils/db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

const authController = new Hono();

authController.post('/mfa-register', async (c) => {
    const { email, password } = await c.req.json();
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    const existingUser = result[0];
    if (existingUser) {
        return c.json({ error: 'User already exists' }, 400);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const mfaSecret = generateSecret();
    await db.insert(usersTable).values({
        email,
        mfaEnabled: true,
        mfaSecret: mfaSecret.secret,
        password: hashedPassword
    })

    return c.json({
        message: 'User successfully registered MFA',
        qrCode: mfaSecret.qrCode
    }, 200);
});

authController.post('/mfa-verify', async (c) => {
    const { email, token } = await c.req.json();
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
    const user = result[0];
    if (!user) {
        return c.json({ error: 'Could not find user' }, 404);
    }

    const isValid = verifyMFAToken(user.mfaSecret!, token);
    if (!isValid) {
        return c.json({ error: 'Invalid MFA token' }, 403);
    }

    const jwtToken = jwt.sign(
        {
            id: user.id,
            email,
            role: user.role
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '1h'
        }
    );

    return c.json({
        message: 'Successfully validated MFA token',
        token: jwtToken
    });
});

export default authController;
