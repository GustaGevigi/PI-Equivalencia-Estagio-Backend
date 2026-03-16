import { AdminProps } from '../domain/entities/Admin';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';

export class GetAdminByCpfService {
  constructor(private adminRepo: IAdminRepository) {}

  async execute(cpf: string): Promise<AdminProps | null> {
    const adminFound = await this.adminRepo.findByCpf(cpf);

    if (!adminFound) {
      return null;
    }

    return adminFound.props;
  }
}
