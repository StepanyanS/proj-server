// import modules
import * as jwt from 'jsonwebtoken';

// import providers
import { UsersService } from './../users/users.service';

interface JwtPayload {
  id: number;
}

export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  createToken(id: number): string {
    const expiresIn = 3600;
    const user: JwtPayload = { id: id };
    return jwt.sign(user, 'secretKey', { expiresIn: expiresIn, algorithm: 'RS256' });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // return await this.usersService.findById(payload.id);
  }
}