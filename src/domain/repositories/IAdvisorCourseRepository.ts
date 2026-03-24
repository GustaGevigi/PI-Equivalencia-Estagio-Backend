import { AdvisorCourse } from '../entities/AdvisorCourse';

export interface IAdvisorCourseRepository {
  create(advisorCourse: AdvisorCourse): Promise<AdvisorCourse>;
  findById(id: number): Promise<AdvisorCourse | null>;
  findByPair(
    advisorId: number,
    courseId: number,
  ): Promise<AdvisorCourse | null>;
  delete(id: number): Promise<void>;
  findAllByAdvisor(advisorId: number): Promise<AdvisorCourse[]>;
  findAllByCourse(courseId: number): Promise<AdvisorCourse[]>;
}
