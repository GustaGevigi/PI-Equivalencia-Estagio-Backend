import { UserToken } from '../entities/UserToken';

export interface IUserTokenRepository {
  generate(userId: number, token: String, expiresAt: Date): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | null>;
  deleteByToken(token: string): Promise<void>;
}
