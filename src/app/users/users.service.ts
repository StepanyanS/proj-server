import { Connection, EntitySchema } from 'typeorm';

import { hash as passwordHash, compare as passwordCompare } from 'bcrypt';

import { createToken } from '../utils/utils';

import { IError } from './../models/error.d';

import { BaseService } from '../shared/base.service';
import { IUser } from '../models/user.d';

export class UsersService extends BaseService<IUser> {

  constructor(userEntity: EntitySchema<IUser>) {
    super(userEntity);
  }

  async addUser(user: IUser): Promise<boolean> {
    try {
      user.password = await passwordHash(user.password, 10);
      await this.addItem(user);
      return true;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  async getUser(id: number) {
    return await this.getById(id);
  }
}