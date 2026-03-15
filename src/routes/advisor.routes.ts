import { Router } from 'express';
import { MakeAdvisorController } from '../main/factories/makeAdvisorController';

const advisorRouter = Router();

advisorRouter.get('/:id', (req, res) => {
  return MakeAdvisorController().getById(req, res);
});

advisorRouter.get('/search/cpf', (req, res) => {
  return MakeAdvisorController().getByCpf(req, res);
});

advisorRouter.get('/search/email', (req, res) => {
  return MakeAdvisorController().getByEmail(req, res);
});

advisorRouter.post('/', (req, res) => {
  return MakeAdvisorController().create(req, res);
});

export default advisorRouter;
