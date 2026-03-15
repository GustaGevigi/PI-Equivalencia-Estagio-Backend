import { Router } from 'express';
import { makeStudentController } from '../main/factories/makeStudentController';

const studentRouter = Router();

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
