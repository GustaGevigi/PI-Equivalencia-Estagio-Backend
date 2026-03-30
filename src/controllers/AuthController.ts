import { Request, Response } from 'express';
import { LoginService } from '../services/auth/LoginService';
import { ForgotPassword } from '../services/auth/ForgotPassword';

export class AuthController {
  constructor(
    private loginService: LoginService,
    private forgotPasswordService: ForgotPassword,
  ) {}

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

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    try {
      await this.forgotPasswordService.execute(email);

      return res.status(200).json({
        message:
          'Se o e-mail existir em nossa base, um link de recuperação será enviado.',
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
