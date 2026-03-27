import { IRequestRepository } from '../../domain/repositories/IRequestRepository';

export class FindAdvisorCourseService {
  constructor(private requestRepo: IRequestRepository) {}

  async execute(advisorId: number, courseId: number) {
    const requests = await this.requestRepo.findByAdvisorCourses(
      advisorId,
      courseId,
    );

    if (!requests) return null;

    return requests;
  }
}
