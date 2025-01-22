import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { db } from '../../db/index.js';
import {
  createLoginSchema,
  createUsersSchema,
  usersTable,
} from '../../db/usersSchema.js';
import { validateData } from '../../middlewares/validationMiddleware.js';

const router = Router();

router.post(
  '/register',
  validateData(createUsersSchema),
  async (req: express.Request, res: express.Response) => {
    try {
      const data = req.cleanBody;
      data.password = await bcrypt.hash(data.password, 10);

      const [user] = await db.insert(usersTable).values(data).returning();

      // @ts-ignore
      delete user.password;

      res.status(201).json({ user });
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

      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
        // Don't provide too much info in message, hackers can use these details
        res.status(401).send({ message: 'Authentication failed' });
        return;
      }

      const passwordMatched = await bcrypt.compare(password, user.password);

      if (!passwordMatched) {
        // Don't provide too much info in message, hackers can use these details
        res.status(401).send({ message: 'Authentication failed' });
        return;
      }

      // Create a jwt token for the user
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET_KEY!,
        { expiresIn: '30d' }
      );

      // @ts-ignore
      delete user.password;

      res.status(200).json({ token, user });
    } catch (e) {
      res.status(500).send('Something went wrong');
    }
  }
);

export default router;
