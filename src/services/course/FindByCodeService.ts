import { CourseProps } from '../../domain/entities/Course';
import { ICourseRepository } from '../../domain/repositories/ICourseRepository';

export class FindByCodeService {
  constructor(private courseRepo: ICourseRepository) {}

  async execute(code: string): Promise<CourseProps | null> {
    const course = await this.courseRepo.findByCode(code);

    if (!course) return null;

    return course.props;
  }
}
