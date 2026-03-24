import { AdvisorCourse } from '../../domain/entities/AdvisorCourse';
import { IAdvisorCourseRepository } from '../../domain/repositories/IAdvisorCourseRepository';

export class FindAdvisorCourseByIdService {
  constructor(private advisorCourseRepo: IAdvisorCourseRepository) {}

  async execute(id: number): Promise<AdvisorCourse | null> {
    const advisorCourse = await this.advisorCourseRepo.findById(id);

    if (!advisorCourse) return null;

    return advisorCourse;
  }
}
