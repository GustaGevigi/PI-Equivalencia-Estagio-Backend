import { Request, Response } from 'express';
import { CreateAdvisorService } from '../services/CreateAdvisorService';
import { GetAdvisorByIdService } from '../services/GetAdvisorByIdService';
import { GetAdvisorByCpfService } from '../services/GetAdvisorByCpfService';
import { GetAdvisorByEmailService } from '../services/GetAdvisorByEmailService';

export class AdvisorController {
  constructor(
    private createAdvisorService: CreateAdvisorService,
    private getAdvisorByIdService: GetAdvisorByIdService,
    private getAdvisorByCpfService: GetAdvisorByCpfService,
    private getAdvisorByEmailService: GetAdvisorByEmailService,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const advisorBody = req.body;

      const newAdvisor = await this.createAdvisorService.execute(advisorBody);

      return res.status(201).json({
        status: 'Success',
        data: newAdvisor,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const foundAdvisor = await this.getAdvisorByIdService.execute(Number(id));

      if (!foundAdvisor) {
        return res.status(404).json({
          message: 'Advisor not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundAdvisor,
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

      const foundAdvisor = await this.getAdvisorByCpfService.execute(
        String(cpf),
      );

      if (!foundAdvisor) {
        return res.status(404).json({
          message: 'Advisor not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundAdvisor,
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

      const foundAdvisor = await this.getAdvisorByEmailService.execute(
        String(email),
      );

      if (!foundAdvisor) {
        return res.status(404).json({
          message: 'Advisor not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundAdvisor,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
