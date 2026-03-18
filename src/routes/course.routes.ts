import { Router } from 'express';
import { makeCourseController } from '../main/factories/makeCourseController';

const courseRouter = Router();

courseRouter.get('/', (req, res) => {
  return makeCourseController().findAll(req, res);
});

courseRouter.get('/:id', (req, res) => {
  return makeCourseController().findById(req, res);
});

courseRouter.post('/', (req, res) => {
  return makeCourseController().create(req, res);
});

export default courseRouter;
