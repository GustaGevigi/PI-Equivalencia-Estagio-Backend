import { Request, Response } from 'express';

import { CreateAdvisorCourseService } from '../services/advisor-course/CreateAdvisorCourseService';
import { DeleteService } from '../services/advisor-course/DeleteService';
import { FindAllByAdvisorService } from '../services/advisor-course/FindAllByAdvisorService';
import { FindAllByCourseService } from '../services/advisor-course/FindAllByCourseService';
import { FindAdvisorCourseByIdService } from '../services/advisor-course/FindByIdService';
import { FindByPairService } from '../services/advisor-course/FindByPairService';

export class AdvisorCourseController {
  constructor(
    private createAdvisorCourseService: CreateAdvisorCourseService,
    private deleteService: DeleteService,
    private findAllByAdvisorService: FindAllByAdvisorService,
    private findAllByCourseService: FindAllByCourseService,
    private findByIdService: FindAdvisorCourseByIdService,
    private findByPairService: FindByPairService,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const advisorCourseBody = req.body;

      const newAdvisorCourse =
        await this.createAdvisorCourseService.execute(advisorCourseBody);

      return res.status(201).json({
        status: 'Success!',
        data: newAdvisorCourse,
      });
    } catch (error: any) {
      return res.status(400).json({
        messsage: error.message,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.deleteService.execute(Number(id));

      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const foundLink = await this.findByIdService.execute(Number(id));

      if (!foundLink) {
        return res.status(404).json({
          message: 'Vinculo não encontrado',
        });
      }

      return res.status(200).json({
        status: 'Success!',
        data: foundLink,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findAllByAdvisor(req: Request, res: Response): Promise<Response> {
    try {
      const { advisorId } = req.params;
      const courses = await this.findAllByAdvisorService.execute(
        Number(advisorId),
      );

      return res.status(200).json({
        status: 'Success!',
        data: courses,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findAllByCourse(req: Request, res: Response): Promise<Response> {
    try {
      const { courseId } = req.params;
      const advisors = await this.findAllByCourseService.execute(
        Number(courseId),
      );

      return res.status(200).json({
        status: 'Success!',
        data: advisors,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async findByPair(req: Request, res: Response): Promise<Response> {
    try {
      const { advisorId, courseId } = req.query;

      const link = await this.findByPairService.execute(
        Number(advisorId),
        Number(courseId),
      );

      if (!link) {
        return res.status(404).json({
          message: 'Vínculo não encontrado entre este orientador e curso.',
        });
      }

      return res.status(200).json({
        status: 'Success!',
        data: link,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
