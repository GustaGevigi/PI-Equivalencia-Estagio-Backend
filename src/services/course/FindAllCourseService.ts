import { Course, CourseProps } from '../../domain/entities/Course';
import {
  CourseFilter,
  ICourseRepository,
} from '../../domain/repositories/ICourseRepository';

export class FindAllCourseService {
  constructor(private courseRepo: ICourseRepository) {}

  async execute(filters?: CourseFilter): Promise<Course[]> {
    return await this.courseRepo.findAll(filters);
  }
}
