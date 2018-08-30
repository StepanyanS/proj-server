import { EntitySchema } from 'typeorm';

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
    const user = await this.getById(id);
    if(user) return {
      email: user.email,
      userName: user.userName
    }
    return false;
  }

  async editUser(id: number, user: IUser) {
    try {
      user.password = await passwordHash(user.password, 10);
      return await this.editItem(id, user);
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  async removeUser(id: number): Promise<boolean> {
    try {
      await this.removeItem(id);
      return true;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  async login(user: IUser): Promise<boolean | string> {
    const result = await this.repo.findOne({email: user.email});
    if(result) return await createToken(result.id);
    return false;
  }
}