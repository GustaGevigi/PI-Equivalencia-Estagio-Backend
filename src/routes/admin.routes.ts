import { Router } from 'express';
import { MakeAdminController } from '../main/factories/makeAdminController';

const adminRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Administrators
 *     description: Administrator API endpoint
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Administrator:
 *       type: object
 *       required:
 *          - name
 *          - email
 *          - password
 *          - cpf
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         cpf:
 *           type: string
 */

/**
 * @swagger
 * /administrators/{id}:
 *   get:
 *     tags:
 *       - Administrators
 *     summary: Get admin by ID.
 *     description: Get admin by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Administrator ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Admin not found
 *       '500':
 *         description: Internal server error
 */
adminRouter.get('/:id', (req, res) => {
  return MakeAdminController().getById(req, res);
});

/**
 * @swagger
 * /administrators/search/cpf?cpf={cpf}:
 *   get:
 *     tags:
 *       - Administrators
 *     summary: Get admin by CPF.
 *     description: Get admin by CPF.
 *     parameters:
 *       - in: query
 *         name: cpf
 *         schema:
 *           type: string
 *         required: true
 *         description: Administrator CPF
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Administrator not found
 *       '500':
 *         description: Internal server error
 */
adminRouter.get('/search/cpf', (req, res) => {
  return MakeAdminController().getByCpf(req, res);
});

/**
 * @swagger
 * /administrators/search/email?email={email}:
 *   get:
 *     tags:
 *       - Administrators
 *     summary: Get admin by E-mail.
 *     description: Get admin by E-mail.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Administrator E-mail
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Administrator not found
 *       '500':
 *         description: Internal server error
 */
adminRouter.get('/search/email', (req, res) => {
  return MakeAdminController().getByEmail(req, res);
});

/**
 * @swagger
 * /administrators/:
 *   post:
 *     tags:
 *       - Administrators
 *     summary: Create administrator.
 *     description: Create administrator.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           description: Create administrator
 *           schema:
 *             $ref: '#/components/schemas/Administrator'
 *     responses:
 *       '201':
 *         description: Created administrator successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
adminRouter.post('/', (req, res) => {
  return MakeAdminController().create(req, res);
});

export default adminRouter;
