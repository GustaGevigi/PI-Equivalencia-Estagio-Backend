import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class FindByStudentService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(studentId: number) {
    const requests = await this.requestRepo.findByStudent(studentId);

    if (!requests) return [];

    return requests;
  }
}
