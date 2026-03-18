import { Course, CourseProps } from '../../domain/entities/Course';
import { ICourseRepository } from '../../domain/repositories/ICourseRepository';

type CourseDTO = Omit<CourseProps, 'id'>;

export class CreateCourseService {
  constructor(private courseRepo: ICourseRepository) {}

  async execute(course: CourseDTO): Promise<Course> {
    const newCourse = new Course(course);

    await this.courseRepo.create(newCourse);

    return newCourse;
  }
}
