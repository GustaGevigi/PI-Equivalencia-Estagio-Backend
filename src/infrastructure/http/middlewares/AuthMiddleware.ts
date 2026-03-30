import { Request, Response, NextFunction } from 'express';
import { JwtAuthProvider } from '../../auth/JwtAuthProvider';

const authProvider = new JwtAuthProvider();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token não fornecido.',
    });
  }

  const [, token] = authHeader.split(' ');

  const decoded = authProvider.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({
      message: 'Token inválido ou expirado.',
    });
  }

  req.user = {
    id: Number(decoded.sub),
    email: decoded.email,
    role: decoded.role,
  };

  return next();
};
