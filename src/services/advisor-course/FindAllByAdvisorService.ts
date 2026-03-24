import { AdvisorCourse } from '../../domain/entities/AdvisorCourse';
import { IAdvisorCourseRepository } from '../../domain/repositories/IAdvisorCourseRepository';

import { IAdvisorRepository } from '../../domain/repositories/IAdvisorRepository';

export class FindAllByAdvisorService {
  constructor(
    private advisorCourseRepo: IAdvisorCourseRepository,
    private advisorRepo: IAdvisorRepository,
  ) {}

  async execute(advisorId: number): Promise<AdvisorCourse[]> {
    const advisorExists = await this.advisorRepo.findById(advisorId);

    if (!advisorExists) {
      throw new Error('Orientador não encontrado no sistema.');
    }
    const links = await this.advisorCourseRepo.findAllByAdvisor(advisorId);

    return links;
  }
}
