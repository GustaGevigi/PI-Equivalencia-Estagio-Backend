export interface UserTokenProps {
  id?: number;
  token: string;
  userId: number;
  expiresAt: Date;
}

export class UserToken {
  constructor(public props: UserTokenProps) {}
}
