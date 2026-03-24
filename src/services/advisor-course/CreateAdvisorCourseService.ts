import { AdvisorCourse } from '../../domain/entities/AdvisorCourse';
import { IAdvisorCourseRepository } from '../../domain/repositories/IAdvisorCourseRepository';

export class CreateAdvisorCourseService {
  constructor(private advisorCourseRepo: IAdvisorCourseRepository) {}

  async execute(data: {
    advisorId: number;
    courseId: number;
    expirationDate: Date;
  }) {
    if (new Date(data.expirationDate) <= new Date()) {
      throw new Error('A data de expiração deve ser uma data futura');
    }

    const alreadyLinked = await this.advisorCourseRepo.findByPair(
      data.advisorId,
      data.courseId,
    );

    if (alreadyLinked) {
      throw new Error('Este orientador já está vinculado a este curso');
    }

    const newLink = new AdvisorCourse(data);
    return await this.advisorCourseRepo.create(newLink);
  }
}
