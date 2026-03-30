import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IHashProvider } from '../../domain/providers/IHashProvider';
import { IAuthProvider } from '../../domain/providers/IAuthProvider';

export class LoginService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private authProvider: IAuthProvider,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('E-mail ou senha incorretos.');
    }

    const passwordMatched = await this.hashProvider.compare(
      password,
      user.props.password,
    );

    if (!passwordMatched) {
      throw new Error('E-mail ou senha incorretos.');
    }

    if (!user.props.id) {
      throw new Error('Erro interno: Usuário sem identificação válida.');
    }

    const token = this.authProvider.generateToken({
      id: user.props.id,
      email: user.props.email,
      role: user.props.role,
    });

    return {
      user: {
        id: user.props.id,
        email: user.props.email,
        role: user.props.role,
      },
      token,
    };
  }
}
