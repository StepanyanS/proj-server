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
      const res = await this.addItem(user);
      return res ? true : false;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  async getUser(id: number) {
    try {
      const user = await this.getById(id);
      return user ? { email: user.email, userName: user.userName } : false;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  async editUser(id: number, user: IUser) {
    try {
      user.password = await passwordHash(user.password, 10);
      return await this.editItem(id, user.email);
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  async removeUser(id: number): Promise<boolean> {
    try {
      const result = await this.removeItem(id);
      return result.raw.affectedRows ? true : false;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }

  async login(user: IUser): Promise<boolean | string> {
    try {
      const result = await this.repo.findOne({email: user.email});
      if(result) {
        return await passwordCompare(user.password, result.password) ? await createToken(result.id) : false;
      }
      return false;
    }
    catch(err) {
      console.log(err);
      return false;
    }
  }
}