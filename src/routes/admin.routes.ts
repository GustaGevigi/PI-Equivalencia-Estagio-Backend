import { Router } from 'express';
import { MakeAdminController } from '../main/factories/makeAdminController';

const adminRouter = Router();

adminRouter.get('/:id', (req, res) => {
  return MakeAdminController().getById(req, res);
});

adminRouter.get('/search/cpf', (req, res) => {
  return MakeAdminController().getByCpf(req, res);
});

adminRouter.get('/search/email', (req, res) => {
  return MakeAdminController().getByEmail(req, res);
});

adminRouter.post('/', (req, res) => {
  return MakeAdminController().create(req, res);
});

export default adminRouter;
