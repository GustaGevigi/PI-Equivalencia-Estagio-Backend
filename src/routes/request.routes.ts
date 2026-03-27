import { Router } from 'express';
import { RequestFactory } from '../main/factories/RequestFactory';
import { upload } from '../infrastructure/http/middleware/upload';

const requestRoutes = Router();
const requestController = RequestFactory.create();

requestRoutes.post('/', upload.array('files'), (req, res) =>
  requestController.create(req, res),
);

requestRoutes.post('/protocol/generate', (req, res) =>
  requestController.generateProtocol(req, res),
);

requestRoutes.get('/:id', (req, res) => requestController.findById(req, res));

// Listar todas as solicitações de um aluno
requestRoutes.get('/student/:studentId', (req, res) =>
  requestController.findByStudent(req, res),
);

// Buscar por protocolo (Ex: /requests/search/protocol?protocol=REQ123)
requestRoutes.get('/search/protocol', (req, res) =>
  requestController.findByProtocol(req, res),
);

// Verificar duplicidade antes de enviar (Ex: /requests/check/duplicity?id=1&equivalencyId=2)
requestRoutes.get('/check/duplicity', (req, res) =>
  requestController.checkDuplicity(req, res),
);

// Filtro para Orientadores: Busca por curso vinculado
requestRoutes.get('/advisor/:id/course/:courseId', (req, res) =>
  requestController.findByAdvisorCourse(req, res),
);

// Atualizar apenas o status (Deferido, Indeferido, etc)
requestRoutes.patch('/:id/status', (req, res) =>
  requestController.updatedStatus(req, res),
);

// Adicionar observação/justificativa
requestRoutes.patch('/:id/observation', (req, res) =>
  requestController.addObservation(req, res),
);

// Cancelar solicitação (Deleção lógica ou física conforme seu Repo)
requestRoutes.delete('/:id', (req, res) => requestController.cancel(req, res));

export default requestRoutes;
