import { compare, hash } from 'bcrypt';
import { IHashProvider } from '../../domain/providers/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  async compare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  async hash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
