import { Router } from 'express';
import { AuthFactory } from '../main/factories/AuthFactory';

const authRouter = Router();

const authController = AuthFactory.create();

authRouter.post('/login', (req, res) => authController.login(req, res));
authRouter.post('/forgot-password', (req, res) =>
  authController.forgotPassword(req, res),
);
authRouter.get('/reset-password', (req, res) => {
  const { token } = req.query;
  return res.json({
    message: 'Página de reset de senha (simulada)',
    token_recebido: token,
  });
});

export default authRouter;
