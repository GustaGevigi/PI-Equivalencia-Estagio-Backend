import { SequelizeStudentRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeStudentRepository';
import { CreateStudentService } from '../../services/CreateStudentService';
import { GetStudentByIdService } from '../../services/GetStudentByIdService';
import { GetStudentByCpfService } from '../../services/GetStudentByCpfService';
import { GetStudentByEmailService } from '../../services/GetStudentByEmailService';
import { StudentController } from '../../controllers/StudentController';

export const makeStudentController = () => {
  //Instancia o repositório do Sequelize
  const studentRepository = new SequelizeStudentRepository();

  //Instancia as Services passando o repositório
  const createStudentService = new CreateStudentService(studentRepository);
  const getStudentByIdService = new GetStudentByIdService(studentRepository);
  const getStudentByCpfService = new GetStudentByCpfService(studentRepository);
  const getStudentByEmailService = new GetStudentByEmailService(
    studentRepository,
  );

  //Instancia a Controller passando as instâncias das Services
  const studentController = new StudentController(
    createStudentService,
    getStudentByIdService,
    getStudentByCpfService,
    getStudentByEmailService,
  );

  return studentController;
};
