import { Request, Response } from 'express';
import { CreateEquivalencyService } from '../services/equivalency/CreateEquivalencyService';
import { FindAllService } from '../services/equivalency/FindAllService';
import { FindByNameService } from '../services/equivalency/FindByNameService';
import { FindByIdService } from '../services/equivalency/FindByIdService';
import { UpdateEquivalency } from '../services/equivalency/UpdateEquivalency';

export class EquivalencyController {
  constructor(
    private createEquivalency: CreateEquivalencyService,
    private findAllService: FindAllService,
    private findByNameService: FindByNameService,
    private findByIdService: FindByIdService,
    private updateService: UpdateEquivalency,
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const equivalencyBody = req.body;

      const newEquivalency =
        await this.createEquivalency.execute(equivalencyBody);

      return res.status(201).json({
        status: 'Success!',
        data: newEquivalency,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const equivalencies = await this.findAllService.execute();

      if (equivalencies.length === 0) {
        return res.status(404).json({
          message: 'No equivalencies found!',
        });
      }

      return res.status(200).json({
        status: 'Succes',
        data: equivalencies,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findByName(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.query;

      const foundEquivalency = await this.findByNameService.execute(
        String(name),
      );

      if (!foundEquivalency) {
        return res.status(404).json({
          message: 'Equivalency not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundEquivalency,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const foundEquivalency = await this.findByIdService.execute(Number(id));

      if (!foundEquivalency) {
        return res.status(404).json({
          message: 'Equivalency not found!',
        });
      }

      return res.status(200).json({
        status: 'Success',
        data: foundEquivalency,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      const foundEquivalency = await this.findByIdService.execute(Number(id));

      if (!foundEquivalency) {
        return res.status(404).json({
          message: 'Equivalency not found!',
        });
      }

      const updatedEquivalency = await this.updateService.execute(
        Number(id),
        data,
      );

      return res.status(200).json({
        status: 'success',
        data: updatedEquivalency,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
