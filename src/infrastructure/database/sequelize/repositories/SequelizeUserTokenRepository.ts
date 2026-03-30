import { IUserTokenRepository } from '../../../../domain/repositories/IUserTokenRepository';
import { UserToken } from '../../../../domain/entities/UserToken';
import UserTokenModel from '../models/UserTokenModel';

export class SequelizeUserTokenRepository implements IUserTokenRepository {
  async generate(
    userId: number,
    token: string,
    expiresAt: Date,
  ): Promise<UserToken> {
    const userToken = await UserTokenModel.create({
      userId,
      token,
      expiresAt,
    });

    return new UserToken(userToken.toJSON());
  }

  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await UserTokenModel.findOne({ where: { token } });
    if (!userToken) return null;
    return new UserToken(userToken.toJSON());
  }

  async deleteByToken(token: string): Promise<void> {
    const userToken = await UserTokenModel.destroy({ where: { token } });
  }
}
