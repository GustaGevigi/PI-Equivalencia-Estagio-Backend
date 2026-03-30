import { Request, Response } from 'express';
import { LoginService } from '../services/auth/LoginService';

export class AuthController {
  constructor(private loginService: LoginService) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.loginService.execute(email, password);
      return res.json({
        status: 'Success!',
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error.message,
      });
    }
  }
}
