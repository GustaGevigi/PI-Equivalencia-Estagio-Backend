import { AdvisorCourse } from '../../domain/entities/AdvisorCourse';
import { IAdvisorCourseRepository } from '../../domain/repositories/IAdvisorCourseRepository';

export class FindAllByCourseService {
  constructor(private advisorCourse: IAdvisorCourseRepository) {}

  async execute(courseId: number) {
    return await this.advisorCourse.findAllByCourse(courseId);
  }
}
