import { IAdvisorCourseRepository } from '../../domain/repositories/IAdvisorCourseRepository';

export class DeleteService {
  constructor(private advisorCourse: IAdvisorCourseRepository) {}

  async execute(id: number): Promise<void> {
    const advisorCourse = await this.advisorCourse.findById(id);

    if (!advisorCourse) {
      throw new Error('Vínculo não encontrado!');
    }

    await this.advisorCourse.delete(id);
  }
}
