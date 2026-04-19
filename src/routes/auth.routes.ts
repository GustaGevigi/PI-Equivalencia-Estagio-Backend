import { Router } from 'express';
import { AuthFactory } from '../main/factories/AuthFactory';

const authRouter = Router();

const authController = AuthFactory.create();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autentificação e Recuperação de Senha
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login with E-mail and password.
 *     description: Login with E-mail and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           description: User login credentials
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *       '401':
 *         description: Invalid email or password
 *       '500':
 *         description: Internal server error
 */
authRouter.post('/login', (req, res) => authController.login(req, res));

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Request password reset.
 *     description: Request password reset.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           description: User login email
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       '200':
 *         description: A successful response
 *       '401':
 *         description: Invalid email
 *       '500':
 *         description: Internal server error
 */
authRouter.post('/forgot-password', (req, res) =>
  authController.forgotPassword(req, res),
);

/* ======= TODO: implementar o reset de senha ======= */

/**
 * @swagger
 * /auth/reset-password/?token={token}:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Password reset.
 *     description: Password reset.
 *     parameters:
 *       - in: query
 *         name: token
 *         schema:
 *           type: string
 *         description: Reset password token
 *     responses:
 *       '200':
 *         description: A successful response
 *       '500':
 *         description: Internal server error
 */
authRouter.get('/reset-password', (req, res) => {
  const { token } = req.query;
  return res.json({
    message: 'Página de reset de senha (simulada)',
    token_recebido: token,
  });
});

export default authRouter;
