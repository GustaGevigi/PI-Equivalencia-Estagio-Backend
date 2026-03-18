import { SequelizeCourseRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeCourseRepository';
import { CreateCourseService } from '../../services/course/CreateCourseService';
import { FindCourseByIdService } from '../../services/course/FindByIdService';
import { FindAllCourseService } from '../../services/course/FindAllCourseService';
import { CourseController } from '../../controllers/CourseController';

export const makeCourseController = () => {
  const courseRepository = new SequelizeCourseRepository();

  const createCourseService = new CreateCourseService(courseRepository);
  const findCourseByIdService = new FindCourseByIdService(courseRepository);
  const findAllCourseService = new FindAllCourseService(courseRepository);

  const courseController = new CourseController(
    createCourseService,
    findCourseByIdService,
    findAllCourseService,
  );

  return courseController;
};
