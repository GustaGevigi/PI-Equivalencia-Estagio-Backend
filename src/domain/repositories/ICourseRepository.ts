import { Course, Shift } from '../entities/Course';

export interface CourseFilter {
  name?: string;
  shift?: Shift;
}

export interface ICourseRepository {
  create(course: Course): Promise<void>;
  findAll(filters?: CourseFilter): Promise<Course[]>;
  findById(id: number): Promise<Course | null>;
}
