import { Request } from 'express';

interface JWTUser {
  username: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface AppRequest extends Request {
  user?: JWTUser;
}
