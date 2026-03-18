import { CourseProps } from '../../domain/entities/Course';
import { ICourseRepository } from '../../domain/repositories/ICourseRepository';

export class FindCourseByIdService {
  constructor(private courseRepo: ICourseRepository) {}

  async execute(id: number): Promise<CourseProps | null> {
    const course = await this.courseRepo.findById(id);

    if (!course) return null;

    return course.props;
  }
}
