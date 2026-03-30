export interface IAuthProvider {
  generateToken(user: { id: number; email: string; role: string }): string;
  verifyToken(token: string): any;
}
