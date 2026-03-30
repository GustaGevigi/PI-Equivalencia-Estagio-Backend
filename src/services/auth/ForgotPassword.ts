import crypto from 'crypto';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IUserTokenRepository } from '../../domain/repositories/IUserTokenRepository';
import { IMailProvider } from '../../domain/providers/IMailProvider';

export class ForgotPassword {
  constructor(
    private userRepository: IUserRepository,
    private userTokenRepository: IUserTokenRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    await this.userTokenRepository.generate(user.props.id!, token, expiresAt);

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

    await this.mailProvider.sendMail({
      to: user.props.email,
      subject: 'Recuperação de Senha',
      body: `<p>Recuperação de senha solicitada para este email. Clique no link: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });
  }
}
