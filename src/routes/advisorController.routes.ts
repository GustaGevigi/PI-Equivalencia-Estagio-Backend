import { Router } from 'express';
import { AdvisorCourseFactory } from '../main/factories/AdvisorCourseFactory';

const advisorCourseRouter = Router();

advisorCourseRouter.post('/', (req, res) => {
  return AdvisorCourseFactory().create(req, res);
});

advisorCourseRouter.delete('/:id', (req, res) => {
  return AdvisorCourseFactory().delete(req, res);
});

advisorCourseRouter.get('/:id', (req, res) => {
  return AdvisorCourseFactory().findById(req, res);
});

advisorCourseRouter.get('/advisor/:advisorId', (req, res) => {
  return AdvisorCourseFactory().findAllByAdvisor(req, res);
});

advisorCourseRouter.get('/course/:courseId', (req, res) => {
  return AdvisorCourseFactory().findAllByCourse(req, res);
});

advisorCourseRouter.get('/search/pair', (req, res) => {
  return AdvisorCourseFactory().findByPair(req, res);
});

export default advisorCourseRouter;
