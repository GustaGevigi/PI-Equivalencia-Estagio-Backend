import { AdvisorCourse } from '../../domain/entities/AdvisorCourse';
import { SequelizeAdvisorCourseRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeAdvisorCourseRepository';

import { CreateAdvisorCourseService } from '../../services/advisor-course/CreateAdvisorCourseService';
import { DeleteService } from '../../services/advisor-course/DeleteService';
import { FindAllByAdvisorService } from '../../services/advisor-course/FindAllByAdvisorService';
import { FindAllByCourseService } from '../../services/advisor-course/FindAllByCourseService';
import { FindAdvisorCourseByIdService } from '../../services/advisor-course/FindByIdService';
import { FindByPairService } from '../../services/advisor-course/FindByPairService';

import { AdvisorCourseController } from '../../controllers/AdvisorCourseController';
import { SequelizeAdvisorRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeAdvisorRepository';

export const AdvisorCourseFactory = () => {
  const advisorCourseRepository = new SequelizeAdvisorCourseRepository();
  const advisorRepository = new SequelizeAdvisorRepository();

  const createAdvisorCourseService = new CreateAdvisorCourseService(
    advisorCourseRepository,
  );
  const deleteService = new DeleteService(advisorCourseRepository);
  const findAllByAdvisorService = new FindAllByAdvisorService(
    advisorCourseRepository,
    advisorRepository,
  );
  const findAllByCourseService = new FindAllByCourseService(
    advisorCourseRepository,
  );
  const findByIdService = new FindAdvisorCourseByIdService(
    advisorCourseRepository,
  );
  const findByPairService = new FindByPairService(advisorCourseRepository);

  const advisorCourseController = new AdvisorCourseController(
    createAdvisorCourseService,
    deleteService,
    findAllByAdvisorService,
    findAllByCourseService,
    findByIdService,
    findByPairService,
  );
  return advisorCourseController;
};
