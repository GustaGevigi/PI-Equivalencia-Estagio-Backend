import { Admin, AdminProps } from '../../domain/entities/Admin';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';

import { IUserRepository } from '../../domain/repositories/IUserRepository';

import bcrypt from 'bcrypt';

type AdminDTO = Omit<AdminProps, 'id'>;

export class CreateAdminService {
  constructor(
    private adminRepo: IAdminRepository,
    private userRepo: IUserRepository,
  ) {}

  async execute(admin: AdminDTO) {
    if (await this.userRepo.findByEmail(admin.email)) {
      throw new Error('Email já cadastrado');
    }

    if (await this.userRepo.findByCpf(admin.cpf)) {
      throw new Error('CPF já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(admin.password, 10);

    const newAdmin = new Admin({
      ...admin,
      password: hashedPassword,
      role: 'administrator',
    });

    const savedAdmin = await this.adminRepo.create(newAdmin);

    return savedAdmin;
  }
}
