import { Router } from 'express';
import { AuthFactory } from '../main/factories/AuthFactory';

const authRouter = Router();

const authController = AuthFactory.create();

authRouter.post('/login', (req, res) => authController.login(req, res));

export default authRouter;
