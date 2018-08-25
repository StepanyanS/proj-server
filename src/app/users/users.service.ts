// import modules
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// import models
import { IUser } from '../models/user';
import { IError } from './../models/error.d';
import { IRest } from '../models/rest';

// import db
import { Database } from '../db/db';

// import entitie
import { UserEntity } from '../entities/user.entity';

interface JwtPayload {
  id: number;
}

interface IUserWeb {
  email: string,
  name: string
}


/**
 * @description Users Controller Provider instance
 * @export
 * @class UsersService
 * @implements {IRest}
 */
export class UsersService {

  /**
   * @description Creates an instance of UsersService.
   * @param {Datebase} db
   * @param {UserEntity} userEntity
   * @memberof UsersService
   */
  constructor(
    private db: Database
  ) {}

  
  private createToken(id: number): string {
    const expiresIn = 3600;
    const user: JwtPayload = { id: id };
    return jwt.sign(user, 'secretKey', { expiresIn: expiresIn});
  }


  async addUser(user: IUser): Promise<boolean | IError> {
    return this.db.connect().then(async (connection: Connection | false): Promise<boolean | IError> => {
      if(connection) {
        try {
          let error: IError;
          let checkedUser = await connection.getRepository(UserEntity).findOne({email: user.email});
          if(checkedUser) {
            await connection.close();
            console.log('DB connection is closed');
            error = {
              type: 'Access denied.',
              statusCode: 422,
              message: 'The user with entered email is already exists'
            }
            return error;
          }

          checkedUser = await connection.getRepository(UserEntity).findOne({name: user.name});
          if(checkedUser) {
            await connection.close();
            console.log('DB connection is closed');
            error = {
              type: 'Access denied.',
              statusCode: 422,
              message: 'The user with entered name is already exists'
            }
          }

          if(error) return error;

          const saltRounds = 10;
          const hash = await bcrypt.hash(user.password, saltRounds);
          user.password = hash;
          const userEntity = new UserEntity();
          Object.assign(userEntity, user);
          await connection.getRepository(UserEntity).save(userEntity);
          await connection.close();
          console.log('DB connection is closed');
          return true;
        }
        catch(err) {
          await connection.close();
          console.log('DB connection is closed');
          const error: IError = {
            type: 'Bad Gateway',
            statusCode: 502,
            message: 'Something went wrong'
          }
          return error;
        }
      }
      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Cannot connect database'
      }
      return error;
    }).catch(error => false);
  }


  async getUser(id: number): Promise<IError | IUserWeb | boolean> {
    return this.db.connect().then(async (connection: Connection): Promise<IError | IUserWeb | boolean> => {
      if(connection) {
        const result: UserEntity = await connection.getRepository(UserEntity).findOne({id: id});
        if(!result) {
          const error: IError = {
            type: 'Access denied.',
            statusCode: 422,
            message: 'Cannot get user data'
          }
          await connection.close();
          console.log('DB connection is closed');
          return error;
        }

        const userData: IUserWeb = {
          email: result.email,
          name: result.name
        };

        await connection.close();
        console.log('DB connection is closed');
        return userData;
      }

      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Cannot connect database'
      }
      return error;
    }).catch(error => false);
  }


  // async editUser(user: IUser): Promise<UserEntity | IError> {
  //   try {
  //     const userToEdit: UserEntity | IError = await this.getUser(user, true);
  //     if(userToEdit instanceof UserEntity) {
  //       const saltRounds = 10;
  //       const hash = await bcrypt.hash(user.editedPassword, saltRounds);
  //       await this.db.connection.getRepository(UserEntity).update(userToEdit.id, { password: hash, name: user.name});
  //       await this.db.close();
  //       return userToEdit;
  //     }
  //     const error: IError = {
  //       type: 'Unauthorized',
  //       statusCode: 403,
  //       message: 'Access denied'
  //     }
  //     return error;
  //   }
  //   catch(err) {
  //     const error: IError = {
  //       type: 'Bad Gateway',
  //       statusCode: 502,
  //       message: 'Cannot connect database'
  //     }
  //     return error;
  //   }
  // }

  async deleteUser(param): Promise<boolean> {
    return this.db.connect().then(async (connection) => {
      if(!connection) return false;
      await connection.getRepository(UserEntity).delete({email: param.user.email});
      await connection.close();
      console.log('DB connection is closed');
      return true;
    }).catch(error => {
      return false;
    })
  }

  async login(user: IUser): Promise<string | IError | boolean> {
    return this.db.connect().then(async (connection: Connection | false): Promise<string | IError | boolean> => {
      if(connection) {
        try {
          const userFound = await connection.getRepository(UserEntity).findOne({email: user.email});
          if(!userFound) {
            await connection.close();
            console.log('DB connection is closed');
            const error: IError = {
              type: 'Anauthorized',
              statusCode: 403,
              message: 'Email address or password is wrong.'
            }
            return error;
          }
          try {
            const passwordIsValid = await bcrypt.compare(user.password, userFound.password);
            if(!passwordIsValid) {
              await connection.close();
              console.log('DB connection is closed');
              const error: IError = {
                type: 'Anauthorized',
                statusCode: 403,
                message: 'Email address or password is wrong.'
              }
              return error;
            }

            const token = this.createToken(userFound.id);
            await connection.close();
            console.log('DB connection is closed');
            return token;
          }
          catch(err) {
            await connection.close();
            console.log('DB connection is closed');
            const error: IError = {
              type: 'Bad Gateway',
              statusCode: 502,
              message: 'Something went wrong'
            }
            return error;
          }
        }
        catch(err) {
          await connection.close();
          console.log('DB connection is closed');
          const error: IError = {
            type: 'Bad Gateway',
            statusCode: 502,
            message: 'Something went wrong'
          }
          return error;
        }
      }

      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Cannot connect to database'
      }
      return error;
    }).catch(error => false);
  }

  async findById(id: number): Promise<UserEntity | boolean> {
    return this.db.connect().then(async (connection): Promise<UserEntity | false> => {
      if(!connection) return false;
      const result: UserEntity = await connection.getRepository(UserEntity).findOne(id);
      await connection.close();
      console.log('DB connection is closed');
      if(!result) {
        return false;
      }
      return result;
    }).catch(err => false);
  }
}