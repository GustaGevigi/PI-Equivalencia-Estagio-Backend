import { SequelizeAdvisorRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeAdvisorRepository';
import { CreateAdvisorService } from '../../services/CreateAdvisorService';
import { GetAdvisorByIdService } from '../../services/GetAdvisorByIdService';
import { GetAdvisorByCpfService } from '../../services/GetAdvisorByCpfService';
import { GetAdvisorByEmailService } from '../../services/GetAdvisorByEmailService';
import { AdvisorController } from '../../controllers/AdvisorController';

export const MakeAdvisorController = () => {
  const advisorRepository = new SequelizeAdvisorRepository();

  const createAdvisorService = new CreateAdvisorService(advisorRepository);
  const getAdvisorByIdService = new GetAdvisorByIdService(advisorRepository);
  const getAdvisorByCpfService = new GetAdvisorByCpfService(advisorRepository);
  const getAdvisorByEmailService = new GetAdvisorByEmailService(
    advisorRepository,
  );

  const advisorController = new AdvisorController(
    createAdvisorService,
    getAdvisorByIdService,
    getAdvisorByCpfService,
    getAdvisorByEmailService,
  );
  return advisorController;
};
