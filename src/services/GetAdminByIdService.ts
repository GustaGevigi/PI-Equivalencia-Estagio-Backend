import { AdminProps } from '../domain/entities/Admin';
import { IAdminRepository } from '../domain/repositories/IAdminRepository';

export class GetAdminByIdService {
  constructor(private adminRepo: IAdminRepository) {}

  async execute(id: number): Promise<AdminProps | null> {
    const adminFound = await this.adminRepo.findById(id);

    if (!adminFound) {
      return null;
    }

    return adminFound.props;
  }
}
