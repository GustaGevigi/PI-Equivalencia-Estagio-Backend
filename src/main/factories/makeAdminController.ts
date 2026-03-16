import { SequelizeAdminRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeAdminRepository';
import { CreateAdminService } from '../../services/CreateAdminService';
import { GetAdminByIdService } from '../../services/GetAdminByIdService';
import { GetAdminByCpfService } from '../../services/GetAdminByCpfService';
import { GetAdminByEmailService } from '../../services/GetAdminByEmailService';
import { AdminController } from '../../controllers/AdminController';

export const MakeAdminController = () => {
  const adminRepository = new SequelizeAdminRepository();

  const createAdminService = new CreateAdminService(adminRepository);
  const getAdminByIdService = new GetAdminByIdService(adminRepository);
  const getAdminByCpfService = new GetAdminByCpfService(adminRepository);
  const getAdminByEmailService = new GetAdminByEmailService(adminRepository);

  const adminController = new AdminController(
    createAdminService,
    getAdminByIdService,
    getAdminByCpfService,
    getAdminByEmailService,
  );

  return adminController;
};
