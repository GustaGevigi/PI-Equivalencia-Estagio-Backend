import { Admin, AdminProps } from '../domain/entities/Admin';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';

import bcrypt from 'bcrypt';

type AdminDTO = Omit<AdminProps, 'id'>;

export class CreateAdminService {
  constructor(private adminRepo: IAdminRepository) {}

  async execute(admin: AdminDTO) {
    if (await this.adminRepo.findByEmail(admin.email)) {
      throw new Error('Email já cadastrado');
    }

    if (await this.adminRepo.findByCpf(admin.cpf)) {
      throw new Error('CPF já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const newAdmin = new Admin({ ...admin, password: hashedPassword });

    await this.adminRepo.create(newAdmin);

    return newAdmin;
  }
}
