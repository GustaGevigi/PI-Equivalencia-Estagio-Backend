import { query, Request, Response } from 'express';
import { CreateStudentService } from '../services/student/CreateStudentService';
import { GetStudentByIdService } from '../services/student/GetStudentByIdService';
import { GetStudentByCpfService } from '../services/student/GetStudentByCpfService';
import { GetStudentByEmailService } from '../services/student/GetStudentByEmailService';

export class StudentController {
  constructor(
    private createStudentService: CreateStudentService,
    private getStudentByIdService: GetStudentByIdService,
    private getStudentByCpfService: GetStudentByCpfService,
    private getStudentByEmailService: GetStudentByEmailService,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const studentBody = req.body;

      const newStudent = await this.createStudentService.execute(studentBody);

      return res.status(201).json({
        status: 'Success!',
        data: newStudent,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const foundStudent = await this.getStudentByIdService.execute(Number(id));

      if (!foundStudent) {
        return res.status(404).json({
          message: 'Student not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundStudent,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getByCpf(req: Request, res: Response): Promise<Response> {
    try {
      const { cpf } = req.query;

      const foundStudent = await this.getStudentByCpfService.execute(
        String(cpf),
      );

      if (!foundStudent) {
        return res.status(404).json({
          message: 'Student not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundStudent,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const { email } = req.query;

      const foundStudent = await this.getStudentByEmailService.execute(
        String(email),
      );

      if (!foundStudent) {
        return res.status(404).json({
          message: 'Student not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundStudent,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
