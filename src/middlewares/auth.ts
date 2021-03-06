import AuthService from '@src/services/auth';
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(
  // Partial faz com que os campos do typo não sejam obrigatórios
  req: Partial<Request>,
  res: Partial<Response>,
  next: NextFunction
): void {
  const token = req.headers?.['x-access-token'];
  try {
    const decoded = AuthService.decodeToken(token as string);
    req.decoded = decoded;
    next();
  } catch (err) {
    res.status?.(401).send({ code: 401, error: err.message });
  }
}
