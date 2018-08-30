import { use, PassportStatic } from 'passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { UsersService } from './../users/users.service';
import { UserEntity } from '../entities/user.entity';

export class PassportMiddleWare {
  public static passport: PassportStatic;
  public static strategyOptions: StrategyOptions;
  public static usersService: UsersService;

  constructor() {}

  public static useStrategy(): void {
    PassportMiddleWare.usersService = new UsersService(UserEntity);
    this.strategyOptions = {
      secretOrKey: 'secretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    PassportMiddleWare.passport = use(new Strategy(this.strategyOptions, async (jwt_payload, done) => {
      const result = await PassportMiddleWare.usersService.getUser(jwt_payload.id);
      if(!result) return done(false, false);
      return done(null, jwt_payload.id);
    }));
  }
}