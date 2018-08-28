// import modules
import { Connection } from 'typeorm';
import { hash, compare } from 'bcrypt';

// import utils
import { createToken } from '../utils/utils';

// import models
import { IUser, User } from '../models/user';
import { IError } from './../models/error.d';
import { IRest } from '../models/rest';

// import DB
import { Database } from '../db/db';

// import entities
import { UserEntity } from '../entities/user.entity';

export class UserFromServer extends User {

  constructor(email: string, name: string) {
    super();
    this.email = email;
    this.name = name;
  }
}


/**
 * @description Users Controller Provider instance
 * @export
 * @class UsersService
 * @implements {IRest}
 */
export class UsersService implements IRest {

  /**
   * @description Creates an instance of UsersService.
   * @param {Datebase} db
   * @param {UserEntity} userEntity
   * @memberof UsersService
   */
  constructor(
    private db: Database
  ) {}


  /**
   * @description Adds user in database
   * @param {IUser} user
   * @returns {(Promise<boolean | IError>)}
   * @memberof UsersService
   */
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

          const saltRounds: number = 10;
          const passwordHash: string = await hash(user.password, saltRounds);
          user.password = passwordHash;
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
    }).catch(err => {
      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Cannot connect database'
      }
      return error;
    });
  }


  /**
   * @description Gets user data from database
   * @param {number} id
   * @returns {(Promise<IError | UserWeb | boolean>)}
   * @memberof UsersService
   */
  async getUser(id: number): Promise<IError | UserFromServer> {
    return this.db.connect().then(async (connection: Connection): Promise<IError | UserFromServer> => {
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

        const userData: UserFromServer = new UserFromServer(result.email, result.name);

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
    }).catch(err => {
      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Something went wrong'
      }
      return error;
    });
  }


  async editUser(user: IUser, id: number): Promise<UserFromServer | IError> {
    try {
      const userToEdit: UserEntity | false = await this.findById(id, true);
      if(!userToEdit) {
        const error: IError = {
          type: 'Bad Gateway',
          statusCode: 502,
          message: 'Something went wrong'
        }
        await this.db.close();
        return error;
      }
      const saltRounds = 10;
      const passwordHash = await hash(user.newPassword, saltRounds);
      await this.db.connection.getRepository(UserEntity).update(id, { password: passwordHash, name: user.name});
      await this.db.close();
      const editedUser: UserFromServer = new UserFromServer(user.email, user.name);
      return editedUser;
    }
    catch(err) {
      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Something went wrong'
      }
      await this.db.close();
      return error;
    }
  }

  async deleteUser(id: number): Promise<IError | boolean> {
    return this.db.connect().then(async (connection) => {
      if(!connection) {
        const error: IError = {
          type: 'Bad Gateway',
          statusCode: 502,
          message: 'Cannot connect database'
        };
        return error;
      }
      try {
        await connection.getRepository(UserEntity).delete({id: id});
        await connection.close();
        console.log('DB connection is closed');
        return true;
      }
      catch(err) {
        const error: IError = {
          type: 'Bad Gateway',
          statusCode: 502,
          message: 'Something went wrong'
        };
        return error;
      }
    }).catch(err => {
      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Cannot connect database'
      };
      return error;
    });
  }


  /**
   * @description Login user by email and password
   * @param {IUser} user
   * @returns {(Promise<string | IError>)}
   * @memberof UsersService
   */
  async login(user: IUser): Promise<string | IError> {
    return this.db.connect().then(async (connection: Connection | false): Promise<string | IError> => {
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
            const passwordIsValid = await compare(user.password, userFound.password);
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

            const token = createToken(userFound.id);
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
    }).catch(err => {
      const error: IError = {
        type: 'Bad Gateway',
        statusCode: 502,
        message: 'Something went wrong'
      }
      return error;
    });
  }



  /**
   * @description Finds user by ID
   * @param {number} id
   * @returns {(Promise<UserEntity | false>)}
   * @memberof UsersService
   */
  async findById(id: number, keepConnection: boolean = false): Promise<UserEntity | false> {
    return this.db.connect().then(async (connection): Promise<UserEntity | false> => {
      if(!connection) return false;
      const result: UserEntity = await connection.getRepository(UserEntity).findOne(id);
      if(!keepConnection) {
        await connection.close();
        console.log('DB connection is closed');
      }
      if(!result) return false;
      return result;
    }).catch((err): false => false);
  }
}