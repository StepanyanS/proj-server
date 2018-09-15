import { sign } from 'jsonwebtoken';
import { JwtPayload } from '../models/jwt';
import { remove as fseRemove } from 'fs-extra';
import { resolve } from 'path';
import { PROJECT_CONFIG } from '../projects/projects.config';

export function createToken(id: number): string {
  const expiresIn: number = 3600;
  const user: JwtPayload = { id: id };
  return sign(user, 'secretKey', { expiresIn: expiresIn});
}

export async function remove(userId: number, ...args): Promise<void> {
  const path: string = resolve(PROJECT_CONFIG.NEW_PROJECT_DIR, userId.toString(), ...args);
  await fseRemove(path);
}