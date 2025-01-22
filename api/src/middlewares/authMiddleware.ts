import type { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    // decode jwt token
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload;

    if (typeof decodedToken !== 'object' || !decodedToken?.userId) {
      res.status(401).json({ error: 'Access denied' });
    }

    req.userId = decodedToken?.userId;
    req.role = decodedToken?.role;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Access denied' });
  }
}

export function verifyParent(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== 'parent') {
    res.status(401).json({ error: 'Access denied' });
    return;
  }
  next();
}
