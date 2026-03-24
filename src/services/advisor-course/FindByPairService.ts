import { AdvisorCourse } from '../../domain/entities/AdvisorCourse';
import { IAdvisorCourseRepository } from '../../domain/repositories/IAdvisorCourseRepository';

export class FindByPairService {
  constructor(private advisorCourseRepo: IAdvisorCourseRepository) {}

  async execute(
    advisorId: number,
    courseId: number,
  ): Promise<AdvisorCourse | null> {
    const advisorCourse = await this.advisorCourseRepo.findByPair(
      advisorId,
      courseId,
    );

    if (!advisorCourse) return null;

    return advisorCourse;
  }
}
