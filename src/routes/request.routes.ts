import { Router } from 'express';
import { RequestFactory } from '../main/factories/RequestFactory';
import { upload } from '../infrastructure/http/middlewares/upload';
import { authMiddleware } from '../infrastructure/http/middlewares/AuthMiddleware';
import { authorize } from '../infrastructure/http/middlewares/RoleMiddleware';

const requestRoutes = Router();
const requestController = RequestFactory.create();

requestRoutes.post(
  '/',
  authMiddleware,
  authorize(['student']),
  upload.array('files'),
  (req, res) => requestController.create(req, res),
);

requestRoutes.post('/protocol/generate', (req, res) =>
  requestController.generateProtocol(req, res),
);

requestRoutes.get('/:id', (req, res) => requestController.findById(req, res));

requestRoutes.get('/student/:studentId', (req, res) =>
  requestController.findByStudent(req, res),
);

requestRoutes.get('/search/protocol', (req, res) =>
  requestController.findByProtocol(req, res),
);

requestRoutes.get('/check/duplicity', (req, res) =>
  requestController.checkDuplicity(req, res),
);

requestRoutes.get('/advisor/:id/course/:courseId', (req, res) =>
  requestController.findByAdvisorCourse(req, res),
);

requestRoutes.patch('/:id/status', (req, res) =>
  requestController.updatedStatus(req, res),
);

requestRoutes.patch('/:id/observation', (req, res) =>
  requestController.addObservation(req, res),
);

requestRoutes.delete('/:id', (req, res) => requestController.cancel(req, res));

export default requestRoutes;
