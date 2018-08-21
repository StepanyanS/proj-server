// import modules
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

// import models
import { IUser } from '../models/user';
import { IError } from './../models/error.d';
import { IRest } from '../models/rest';

// import db
import { Datebase } from '../db/db';

// import entitie
import { UserEntity } from '../entities/user.entity';


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
    private db: Datebase
  ) {}


  async addUser(user: IUser): Promise<UserEntity | IError> {
    return this.db.connect().then(async (connection: Connection | false): Promise<UserEntity | IError> => {
      if(connection) {
        try {
          let checkedUser = await connection.getRepository(UserEntity).findOne({email: user.email});
          if(checkedUser) {
            await connection.close();
            console.log('DB connection is closed');
            const error: IError = {
              type: 'Access denied.',
              statusCode: 403,
              message: 'The user with entered email is already exists'
            }
          }

          checkedUser = await connection.getRepository(UserEntity).findOne({name: user.name});
          if(checkedUser) {
            await connection.close();
            console.log('DB connection is closed');
            const error: IError = {
              type: 'Access denied.',
              statusCode: 403,
              message: 'The user with entered name is already exists'
            }
          }

          const saltRounds = 10;
          const hash = await bcrypt.hash(user.password, saltRounds);
          user.password = hash;
          const userEntity = new UserEntity();
          Object.assign(userEntity, user);
          await connection.getRepository(UserEntity).save(userEntity);
          await connection.close();
          console.log('DB connection is closed');
          return userEntity;
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
    }).catch(error => error);
  }


  async getUser(user: IUser, dbConnect: boolean = false): Promise<IError | UserEntity> {
    return this.db.connect().then(async (connection: Connection) => {
      if(connection) {
        const result: UserEntity = await connection.getRepository(UserEntity).findOne({email: user.email});
        if(!dbConnect) {
          await connection.close();
          console.log('DB connection is closed');
        }
        if(!result) {
          const error: IError = {
            type: 'unauthorized',
            statusCode: 401,
            message: 'Incorrect username or password.'
          }
          return error;
        }
        const match = await bcrypt.compare(user.password, result.password);
        if(!match) {
          const error: IError = {
            type: 'unauthorized',
            statusCode: 401,
            message: 'Incorrect username or password.'
          }
          return error;
        }
        return result;
      }

      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Cannot connect database'
      }
      return error;
    }).catch(error => error);
  }


  async editUser(user: IUser): Promise<UserEntity | IError> {
    try {
      const userToEdit: UserEntity | IError = await this.getUser(user, true);
      if(userToEdit instanceof UserEntity) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(user.editedPassword, saltRounds);
        await this.db.connection.getRepository(UserEntity).update(userToEdit.id, { password: hash, name: user.name});
        await this.db.close();
        return userToEdit;
      }
      const error: IError = {
        type: 'Unauthorized',
        statusCode: 403,
        message: 'Access denied'
      }
      return error;
    }
    catch(err) {
      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Cannot connect database'
      }
      return error;
    }
  }

  async deleteUser(param): Promise<boolean> {
    
  }
}