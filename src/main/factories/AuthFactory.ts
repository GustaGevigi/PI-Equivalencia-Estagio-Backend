import { AuthController } from '../../controllers/AuthController';

import { LoginService } from '../../services/auth/LoginService';
import { BcryptHashProvider } from '../../infrastructure/auth/BcryptHashProvider';
import { JwtAuthProvider } from '../../infrastructure/auth/JwtAuthProvider';

import { SequelizeUserRepository } from '../../infrastructure/database/sequelize/repositories/SequelizeUserRepository';

export class AuthFactory {
  static create(): AuthController {
    const userRepository = new SequelizeUserRepository();
    const hashProvider = new BcryptHashProvider();
    const authProvider = new JwtAuthProvider();

    const loginService = new LoginService(
      userRepository,
      hashProvider,
      authProvider,
    );

    return new AuthController(loginService);
  }
}
