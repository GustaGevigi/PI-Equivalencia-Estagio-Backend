import sequelize from '../../../../config/database';

import { IAdvisorCourseRepository } from '../../../../domain/repositories/IAdvisorCourseRepository';
import AdvisorCourseModel from '../models/AdvisorCourseModel';
import { AdvisorCourse } from '../../../../domain/entities/AdvisorCourse';

import CourseModel from '../models/CourseModel';
import UserModel from '../models/UserModel';

import AdvisorModel from '../models/AdvisorModel';

export class SequelizeAdvisorCourseRepository implements IAdvisorCourseRepository {
  async create(advisorCourse: AdvisorCourse): Promise<AdvisorCourse> {
    const { advisorId, courseId, expirationDate } = advisorCourse.props;

    const createdLink = await AdvisorCourseModel.create({
      advisorId,
      courseId,
      expirationDate,
    });

    return new AdvisorCourse({
      id: createdLink.id,
      advisorId: createdLink.advisorId,
      courseId: createdLink.courseId,
      expirationDate: createdLink.expirationDate,
    });
  }

  async findById(id: number): Promise<AdvisorCourse | null> {
    const found = await AdvisorCourseModel.findByPk(id);

    if (!found) return null;

    return new AdvisorCourse(found.toJSON());
  }

  async findByPair(
    advisorId: number,
    courseId: number,
  ): Promise<AdvisorCourse | null> {
    const found = await AdvisorCourseModel.findOne({
      where: { advisorId, courseId },
    });

    if (!found) {
      return null;
    }

    return new AdvisorCourse(found.toJSON());
  }

  async delete(id: number): Promise<void> {
    await AdvisorCourseModel.destroy({ where: { id } });
  }

  async findAllByAdvisor(advisorId: number): Promise<any[]> {
    const links = await AdvisorCourseModel.findAll({
      where: { advisorId },
      include: [{ model: CourseModel, as: 'course' }],
    });

    return links.map((link) => link.toJSON());
  }

  async findAllByCourse(courseId: number): Promise<any[]> {
    const links = await AdvisorCourseModel.findAll({
      where: { courseId },
      include: [
        {
          model: AdvisorModel,
          as: 'advisor',
          include: [
            {
              model: UserModel,
              as: 'user',
            },
          ],
        },
      ],
    });

    return links.map((link) => link.toJSON());
  }
}
