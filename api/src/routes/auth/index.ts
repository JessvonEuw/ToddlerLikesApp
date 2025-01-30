import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { db } from '@/db';
import { createLoginSchema, createUsersSchema, users } from '@/db/schema';
import { validateData } from '@/middlewares/validationMiddleware.js';

const router = Router();

router.post(
  '/register',
  validateData(createUsersSchema),
  async (req: express.Request, res: express.Response) => {
    try {
      const data = req.cleanBody;
      data.password = await bcrypt.hash(data.password, 10);

      const [registeredUser] = await db.insert(users).values(data).returning();

      // @ts-ignore
      delete registeredUser.password;

      res.status(201).json({ registeredUser });
    } catch (e) {
      res.status(500).send('Something went wrong');
    }
  }
);

router.post(
  '/login',
  validateData(createLoginSchema),
  async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.cleanBody;

      const [loginUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!loginUser) {
        // Don't provide too much info in message, hackers can use these details
        res.status(401).send({ message: 'Authentication failed' });
        return;
      }

      const passwordMatched = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (!passwordMatched) {
        // Don't provide too much info in message, hackers can use these details
        res.status(401).send({ message: 'Authentication failed' });
        return;
      }

      // Create a jwt token for the user
      const token = jwt.sign(
        { userId: loginUser.id, role: loginUser.role },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: '30d' }
      );

      // @ts-ignore
      delete loginUser.password;

      res.status(200).json({ token, loginUser });
    } catch (e) {
      res.status(500).send('Something went wrong');
    }
  }
);

export default router;
