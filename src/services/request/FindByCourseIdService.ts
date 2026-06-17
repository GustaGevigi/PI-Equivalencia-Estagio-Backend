import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class FindByCourseIdService {
  constructor(private requestRepo: IRequestRepository) { }

  async execute(courseId: number) {
    const request = await this.requestRepo.findByCourseId(courseId);

    if (!request) return null;

    return request;
  }
}
