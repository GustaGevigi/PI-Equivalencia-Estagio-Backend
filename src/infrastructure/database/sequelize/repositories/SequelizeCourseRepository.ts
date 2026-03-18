import { Course, CourseProps } from '../../../../domain/entities/Course';
import {
  ICourseRepository,
  CourseFilter,
} from '../../../../domain/repositories/ICourseRepository';
import CourseModel from '../models/CourseModel';

import { Op, WhereOptions } from 'sequelize';

export class SequelizeCourseRepository implements ICourseRepository {
  async create(course: Course): Promise<void> {
    await CourseModel.create(course.props);
  }

  async findAll(filters?: CourseFilter): Promise<Course[]> {
    const where: WhereOptions = {};

    if (filters?.name) {
      where.name = { [Op.like]: `%${filters.name}%` };
    }

    if (filters?.shift) {
      where.shift = filters.shift;
    }

    const courseFromDb = await CourseModel.findAll({ where });

    return courseFromDb.map((course) => new Course(course.toJSON()));
  }

  async findById(id: number): Promise<Course | null> {
    const course = await CourseModel.findOne({ where: { id } });
    return course ? new Course(course.toJSON()) : null;
  }
}
