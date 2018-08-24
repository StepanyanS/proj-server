// import modules
import * as passport from 'passport';
import { ExtractJwt, Strategy, JwtFromRequestFunction } from 'passport-jwt';

// import providers
import { Database } from '../db/db';
import { UsersService } from './../users/users.service';

const db = new Database();
const usersService = new UsersService(db);

interface IOPt {
  secretOrKey: string;
  jwtFromRequest: JwtFromRequestFunction;
}

// export class PassportMiddleWare {

//   constructor() {}

//   use() {
    const options = {
      secretOrKey: 'sasun',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    
    passport.use(new Strategy(options, async (jwt_payload, done) => {
      
      const result = await usersService.findById(jwt_payload.id);
      
      if(!result) return done(result, result);
      return done(null, result);
    }));
//   }
// }

export const mypassport = passport;