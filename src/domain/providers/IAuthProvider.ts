export interface IAuthProvider {
  generateToken(user: {
    id: number;
    name: string;
    email: string;
    role: string;
  }): string;
  verifyToken(token: string): any;
}
