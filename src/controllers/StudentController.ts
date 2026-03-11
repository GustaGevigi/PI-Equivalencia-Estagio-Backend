import { Request, Response } from 'express';
import { CreateStudentService } from '../services/CreateStudentService';

export class StudentController {
  constructor(private createStudentService: CreateStudentService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const studentData = req.body;

      const newStudent = await this.createStudentService.execute(studentData);

      return res.status(201).json({
        status: 'Success!',
        data: newStudent,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
