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

studentRouter.get('/search/cpf', (req, res) => {
  return makeStudentController().getByCpf(req, res);
});

studentRouter.get('/search/email', (req, res) => {
  return makeStudentController().getByEmail(req, res);
});

studentRouter.post('/', (req, res) => {
  return makeStudentController().create(req, res);
});

export default studentRouter;
