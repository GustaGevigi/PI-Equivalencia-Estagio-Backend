import { Request, Response } from 'express';
import { CreateAdminService } from '../services/admin/CreateAdminService';
import { GetAdminByIdService } from '../services/admin/GetAdminByIdService';
import { GetAdminByCpfService } from '../services/admin/GetAdminByCpfService';
import { GetAdminByEmailService } from '../services/admin/GetAdminByEmailService';

export class AdminController {
  constructor(
    private createAdminService: CreateAdminService,
    private getAdminByIdService: GetAdminByIdService,
    private getadminByCpfService: GetAdminByCpfService,
    private getAdminByEmailService: GetAdminByEmailService,
  ) {}

  async create(req: Request, res: Response) {
    try {
      const reqBody = req.body;

      const newAdmin = await this.createAdminService.execute(reqBody);

      return res.status(201).json({
        status: 'Success',
        data: newAdmin,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const foundAdmin = await this.getAdminByIdService.execute(Number(id));

      if (!foundAdmin) {
        return res.status(404).json({
          message: 'Administrator not found!',
        });
      }

      return res.status(201).json({
        status: 'Success',
        data: foundAdmin,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getByCpf(req: Request, res: Response) {
    try {
      const { cpf } = req.query;

      const foundAdmin = await this.getadminByCpfService.execute(String(cpf));

      if (!foundAdmin) {
        return res.status(404).json({
          message: 'Administrator not found!',
        });
      }

      return res.status(201).json({
        status: 'Success',
        data: foundAdmin,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getByEmail(req: Request, res: Response) {
    try {
      const { email } = req.query;

      const foundAdmin = await this.getAdminByEmailService.execute(
        String(email),
      );

      if (!foundAdmin) {
        return res.status(404).json({
          message: 'Administrator not found!',
        });
      }

      return res.status(201).json({
        status: 'Success',
        data: foundAdmin,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
