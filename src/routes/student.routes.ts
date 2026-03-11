import { Router } from 'express';
import { makeStudentController } from '../main/factories/makeStudentController';

const studentRouter = Router();

studentRouter.post('/', (req, res) => {
  return makeStudentController().handle(req, res);
});

export default studentRouter;
