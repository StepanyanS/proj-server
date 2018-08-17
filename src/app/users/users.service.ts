// import typeorm modules
import {getManager} from "typeorm";

// import models
import { IUser } from "../models/user";
import { IRest } from "../models/rest";

// import db
import { Datebase } from "../db/db";

// import entitie
import { UserEntity } from "../entities/user.entity";

export class UsersService implements IRest {

  constructor(
    private db: Datebase
  ) {}


  /**
   * @description gets user from db
   * @param {string} email
   * @returns {Promise<UserEntity>}
   * @memberof UsersService
   */
  async getUserByEmail(email: string): Promise<UserEntity> {
    return this.db.connect().then(async (connection) => {
      const user: UserEntity = await connection.getRepository(UserEntity).findOne({email: email});
      await connection.close();
      return user;
    }).catch(error => error);
  }


  /**
   * @description adds user to db
   * @param {UserEntity} user
   * @returns {Promise<UserEntity>}
   * @memberof UsersService
   */
  async addUser(user: UserEntity): Promise<UserEntity> {
    return this.db.connect().then(async (connection) => {
      await connection.getRepository(UserEntity).save(user);
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
    return this.db.connect().then(async (connection) => {
      const oldUser = await connection.getRepository(UserEntity).findOne({email: user.email});
      Object.assign(oldUser, user);
      await connection.getRepository(UserEntity).save(oldUser);
      await connection.close();
      return user;
    }).catch(error => error);
  }
}