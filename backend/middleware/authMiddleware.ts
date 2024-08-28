import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { authConfig } from '../configs/authConfig';
import { User } from '@prisma/client'; 

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    if (typeof decoded === 'string') {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Garantindo que o decoded seja do tipo JwtPayload e contenha os atributos esperados
    const decodedUser = decoded as JwtPayload & { id: number; isAdmin: boolean };

    req.user = {
      id: decodedUser.id,
      name: '', 
      email: '', 
      password: '', 
      isAdmin: decodedUser.isAdmin
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};
