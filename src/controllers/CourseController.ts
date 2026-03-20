import { Request, Response } from 'express';
import { CreateCourseService } from '../services/course/CreateCourseService';
import { FindCourseByIdService } from '../services/course/FindByIdService';
import { FindAllCourseService } from '../services/course/FindAllCourseService';
import { FindByCodeService } from '../services/course/FindByCodeService';

export class CourseController {
  constructor(
    private createCourseService: CreateCourseService,
    private findCourseByIdService: FindCourseByIdService,
    private findAllCourseService: FindAllCourseService,
    private findByCodeService: FindByCodeService,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const courseBody = req.body;

      const newCourse = await this.createCourseService.execute(courseBody);

      return res.status(201).json({
        status: 'Succes!',
        data: newCourse,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const foundCourse = await this.findCourseByIdService.execute(Number(id));

      if (!foundCourse) {
        return res.status(404).json({
          message: 'Course not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        message: foundCourse,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const { name, shift } = req.query;

      const filters = {
        name: name ? String(name) : undefined,
        shift: shift ? (shift as any) : undefined,
      };

      const courses = await this.findAllCourseService.execute(filters);

      if (courses.length === 0) {
        return res.status(404).json({
          message: 'Course not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: courses,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findByCode(req: Request, res: Response): Promise<Response> {
    try {
      const { code } = req.query;

      const foundCourse = await this.findByCodeService.execute(String(code));

      if (!foundCourse) {
        return res.status(404).json({
          message: 'Course not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundCourse,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
