import { Course, CourseProps } from '../../domain/entities/Course';
import { ICourseRepository } from '../../domain/repositories/ICourseRepository';
import { IAdminRepository } from '../../domain/repositories/IAdminRepository';

type CourseDTO = Omit<CourseProps, 'id'>;

export class CreateCourseService {
  constructor(
    private courseRepo: ICourseRepository,
    private adminRepo: IAdminRepository,
  ) {}

  async execute(course: CourseDTO): Promise<Course> {
    const adminExists = this.adminRepo.findById(course.createdByAdminId);

    if (!adminExists) {
      throw new Error(
        'Operação inválida: O administrador responsável não foi encontrado.',
      );
    }

    const courseAlreadyExists = await this.courseRepo.findByCode(course.code);

    if (courseAlreadyExists) {
      throw new Error('Já existe um curso cadastrado com este código');
    }

    const newCourse = new Course(course);
    await this.courseRepo.create(newCourse);

    return newCourse;
  }
}
