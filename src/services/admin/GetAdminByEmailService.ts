import { AdminProps } from '../../domain/entities/Admin';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';

export class GetAdminByEmailService {
  constructor(private adminRepo: IAdminRepository) {}

  async execute(email: string): Promise<AdminProps | null> {
    const foundAdmin = await this.adminRepo.findByEmail(email);

    if (!foundAdmin) {
      return null;
    }

    return foundAdmin.props;
  }
}
