// import modules
import * as passport from 'passport';
import { ExtractJwt, Strategy, JwtFromRequestFunction, StrategyOptions } from 'passport-jwt';

// import providers
import { Database } from '../db/db';
import { UsersService } from './../users/users.service';

const db = new Database();
const usersService = new UsersService(db);

export class PassportMiddleWare {
  passport: passport.PassportStatic;
  strategyOptions: StrategyOptions;

  constructor() {
    this.passport = passport;
    this.useStrategy();
  }

  useStrategy(): void {
    this.strategyOptions = {
      secretOrKey: 'secretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    
    this.passport.use(new Strategy(this.strategyOptions, async (jwt_payload, done) => {

      try {
        const result = await usersService.findById(jwt_payload.id);
        if(!result) return done(false, false);
        return done(null, result.id);
      }
      catch(err) {
        return done(err, false);
      }
    }));
  }
}

export const passportMiddleware = new PassportMiddleWare();