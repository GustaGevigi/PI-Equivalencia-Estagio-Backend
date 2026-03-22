import { Router } from 'express';
import { makeEquivalencyController } from '../main/factories/makeEquivalencyController';

const equivalencyRouter = Router();

equivalencyRouter.get('/', (req, res) => {
  return makeEquivalencyController().findAll(req, res);
});

equivalencyRouter.get('/search', (req, res) => {
  return makeEquivalencyController().findByName(req, res);
});

equivalencyRouter.get('/:id', (req, res) => {
  return makeEquivalencyController().findById(req, res);
});

equivalencyRouter.post('/create', (req, res) => {
  return makeEquivalencyController().create(req, res);
});

equivalencyRouter.patch('/updated/:id', (req, res) => {
  return makeEquivalencyController().update(req, res);
});

export default equivalencyRouter;
