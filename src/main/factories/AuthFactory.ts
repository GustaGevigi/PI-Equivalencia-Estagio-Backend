import { AuthController } from '../../controllers/AuthController';

import { LoginService } from '../../services/auth/LoginService';
import { BcryptHashProvider } from '../../infrastructure/auth/BcryptHashProvider';
import { JwtAuthProvider } from '../../infrastructure/auth/JwtAuthProvider';

import { SequelizeUserRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeUserRepository';
import { SequelizeUserTokenRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeUserTokenRepository';
import { EtheralMailProvider } from '../../infrastructure/mail/EtheralMailProvider';
import { ForgotPassword } from '../../services/auth/ForgotPassword';

export class AuthFactory {
  static create(): AuthController {
    const userRepository = new SequelizeUserRepository();
    const userTokenRepository = new SequelizeUserTokenRepository();

    const hashProvider = new BcryptHashProvider();
    const authProvider = new JwtAuthProvider();
    const mailProvider = new EtheralMailProvider();

    const loginService = new LoginService(
      userRepository,
      hashProvider,
      authProvider,
    );

    const forgotPasswordService = new ForgotPassword(
      userRepository,
      userTokenRepository,
      mailProvider,
    );

    return new AuthController(loginService, forgotPasswordService);
  }
}
