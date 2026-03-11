import { SequelizeStudentRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeStudentRepository';
import { CreateStudentService } from '../../services/CreateStudentService';
import { StudentController } from '../../controllers/StudentController';

export const makeStudentController = () => {
  const repository = new SequelizeStudentRepository();
  const service = new CreateStudentService(repository);
  const controller = new StudentController(service);
  return controller;
};
