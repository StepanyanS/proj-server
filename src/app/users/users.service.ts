// import modules
import { Connection } from 'typeorm';

// import models
import { IUser } from '../models/user';
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
export class UsersService implements IRest {

  /**
   * @description Creates an instance of UsersService.
   * @param {Datebase} db
   * @param {UserEntity} userEntity
   * @memberof UsersService
   */
  constructor(
    private db: Datebase,
    private userEntity: UserEntity
  ) {}


  /**
   * @description gets user from db
   * @param {string} email
   * @returns {Promise<UserEntity>}
   * @memberof UsersService
   */
  async getUserByEmail(email: string, dbConnect: boolean = false): Promise<UserEntity> {
    return this.db.connect().then(async (connection: Connection) => {
      const user: UserEntity = await connection.getRepository(UserEntity).findOne({email: email});
      if(!dbConnect) await connection.close();
      return user;
    }).catch(error => error);
  }


  /**
   * @description adds user to db
   * @param {UserEntity} user
   * @returns {Promise<UserEntity>}
   * @memberof UsersService
   */
  async addUser(user: IUser): Promise<UserEntity> {
    return this.db.connect().then(async (connection) => {
      Object.assign(this.userEntity, user);
      await connection.getRepository(UserEntity).save(this.userEntity);
      await connection.close();
      return user;
    }).catch(error => error);
  }


  /**
   * @description edits user in db
   * @param {IUser} user
   * @returns {Promise<UserEntity>}
   * @memberof UsersService
   */
  async editUser(user: IUser): Promise<UserEntity> {
    try {
      const oldUser: UserEntity = await this.getUserByEmail(user.email, true);
      Object.assign(oldUser, user);
      await this.db.connection.getRepository(UserEntity).save(oldUser);
      await this.db.connection.close();
      return oldUser;
    }
    catch(error) {
      console.log(error);
    }
  }
}