import jwt from 'jsonwebtoken';
import { IAuthProvider } from '../../domain/providers/IAuthProvider';

export class JwtAuthProvider implements IAuthProvider {
  private readonly secret = process.env.JWT_SECRET || 'fallback_secret';

  generateToken(user: { id: number; email: string; role: string }): string {
    return jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      this.secret,
      {
        expiresIn: '1d',
      },
    );
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      return null;
    }
  }
}
