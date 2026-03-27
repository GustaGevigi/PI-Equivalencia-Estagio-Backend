import { RequestController } from '../../controllers/RequestController';
import { SequelizeRequestRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeRequestRepository';

import { AddObservationService } from '../../services/request/AddObservationService';
import { CancelRequestService } from '../../services/request/CancelRequestService';
import { CheckDuplicityService } from '../../services/request/CheckDuplicityService';
import { CreateRequestService } from '../../services/request/CreateRequestService';
import { FindAdvisorCourseService } from '../../services/request/FindByAdvisorCourseService';
import { FindByIdService } from '../../services/request/FindByIdService';
import { FindByProtocolService } from '../../services/request/FindByProtocolService';
import { FindByStudentService } from '../../services/request/FindByStudentService';
import { GenerateProtocolService } from '../../services/request/GenerateProtocolService';
import { UpdateStatusService } from '../../services/request/UpdateStatusService';

export class RequestFactory {
  static create(): RequestController {
    const repository = new SequelizeRequestRepository();

    const addObservationService = new AddObservationService(repository);
    const cancelRequestService = new CancelRequestService(repository);
    const checkDuplicityService = new CheckDuplicityService(repository);
    const createRequestService = new CreateRequestService(repository);
    const findAdvisorCourseService = new FindAdvisorCourseService(repository);
    const findByIdService = new FindByIdService(repository);
    const findByProtocolService = new FindByProtocolService(repository);
    const findByStudentService = new FindByStudentService(repository);
    const generateProtocolService = new GenerateProtocolService(repository);
    const updateStatusService = new UpdateStatusService(repository);

    return new RequestController(
      addObservationService,
      cancelRequestService,
      checkDuplicityService,
      createRequestService,
      findAdvisorCourseService,
      findByIdService,
      findByProtocolService,
      findByStudentService,
      generateProtocolService,
      updateStatusService,
    );
  }
}
