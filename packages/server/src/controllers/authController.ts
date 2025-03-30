import { Hono } from "hono";
import * as bcrypt from 'bcrypt';
import { generateSecret, verifyMFAToken } from "../services/authService";
import { AppDataSource } from "../../ormconfig";
import { User } from "../entities/User";
import * as jwt from 'jsonwebtoken';

const authController = new Hono();

authController.post('/mfa-register', async (c) => {
    const { email, password } = await c.req.json();
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
        return c.json({ error: 'User already exists' }, 400);
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const mfaSecret = generateSecret();
    const newUser = userRepository.create({
        email,
        mfaEnabled: true,
        mfaSecret: mfaSecret.secret,
        password: hashedPassword
    });

    await userRepository.save(newUser);

    return c.json({
        message: 'User successfully registered MFA',
        qrCode: mfaSecret.qrCode
    }, 200);
});

authController.post('/mfa-verify', async (c) => {
    const { email, token } = await c.req.json();
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });
    if (!user) {
        return c.json({ error: 'Could not find user' }, 404);
    }

    const isValid = verifyMFAToken(user.mfaSecret, token);
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
