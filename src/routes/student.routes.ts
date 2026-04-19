import { Router } from 'express';
import { makeStudentController } from '../main/factories/makeStudentController';

const studentRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Students
 *     description: Students API endpoint
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *          - name
 *          - email
 *          - password
 *          - cpf
 *          - rg
 *          - ra
 *          - tel
 *          - courseId
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
 *         rg:
 *           type: string
 *         ra:
 *           type: string
 *         tel:
 *           type: string
 *         courseId:
 *           type: integer
 */

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get student by ID.
 *     description: Get student by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: Student ID
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Student not found
 *       '500':
 *         description: Internal server error
 */
studentRouter.get('/:id', (req, res) => {
  return makeStudentController().getById(req, res);
});

/**
 * @swagger
 * /students/search/cpf?cpf={cpf}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get student by CPF.
 *     description: Get student by CPF.
 *     parameters:
 *       - in: query
 *         name: cpf
 *         schema:
 *           type: string
 *         required: true
 *         description: Student CPF
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Student not found
 *       '500':
 *         description: Internal server error
 */
studentRouter.get('/search/cpf', (req, res) => {
  return makeStudentController().getByCpf(req, res);
});

/**
 * @swagger
 * /students/search/email?email={email}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get student by E-mail.
 *     description: Get student by E-mail.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Student E-mail
 *     responses:
 *       '200':
 *         description: A successful response
 *       '404':
 *         description: Student not found
 *       '500':
 *         description: Internal server error
 */
studentRouter.get('/search/email', (req, res) => {
  return makeStudentController().getByEmail(req, res);
});

/**
 * @swagger
 * /students/:
 *   post:
 *     tags:
 *       - Students
 *     summary: Create student.
 *     description: Create student.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           description: Create student
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       '201':
 *         description: Created student successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
studentRouter.post('/', (req, res) => {
  return makeStudentController().create(req, res);
});

export default studentRouter;
