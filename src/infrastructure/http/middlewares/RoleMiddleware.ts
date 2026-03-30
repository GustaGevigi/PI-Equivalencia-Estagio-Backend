import { Request, Response, NextFunction } from 'express';

export const authorize = (allowRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: 'Usuário não autenticado.',
      });
    }

    if (!allowRoles.includes(user.role)) {
      return res.status(403).json({
        message: 'Acesso negado: você não tem permissão para esta ação.',
      });
    }

    return next();
  };
};
