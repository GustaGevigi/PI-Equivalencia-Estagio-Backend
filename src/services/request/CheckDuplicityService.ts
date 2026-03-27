import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class CheckDuplicityService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(studentId: number, equivalencyId: number) {
    const duplicity = await this.requestRepo.checkDuplicity(
      studentId,
      equivalencyId,
    );

    if (!duplicity) return false;

    return true;
  }
}
