import { EntitySchema } from 'typeorm';
import { hash as passwordHash, compare as passwordCompare } from 'bcrypt';
import { createToken, remove } from '../utils/utils';
import { BaseService } from '../shared/base.service';
import { IUser } from '../models/user.d';
import { IResult } from './../models/result.d';

export class UsersService extends BaseService<IUser> {

  constructor(userEntity: EntitySchema<IUser>) {
    super(userEntity);
  }

  async findByEmail(email: string): Promise<IResult> {
    const result = await this.repo.findOne({email: email});
    if(result) {
      return {
        statusCode: 200,
        body: {
          status: true,
          message: 'This email already exists',
          data: true
        }
      }
    }
    return {
      statusCode: 200,
      body: {
        status: true,
        message: '',
        data: false
      }
    }
  }

  async addUser(user: IUser): Promise<IResult> {
    const exists = await this.findByEmail(user.email);
    if(exists.body.data) {
      return {
        statusCode: 422,
        body: {
          status: false,
          message: 'This email already exists',
          data: null
        }
      }
    }
    user.password = await passwordHash(user.password, 10);
    const res = await this.addItem(user);
    if(res) {
      return {
        statusCode: 201,
        body: {
          status: true,
          message: 'Now You can login',
          data: null
        }
      }
    }
    return {
      statusCode: 502,
      body: {
        status: false,
        message: 'Something went wrong',
        data: null
      }
    }
  }

  async getUser(id: number) {
    const user = await this.getById(id);
    if(user) {
      return {
        statusCode: 200,
        body: {
          status: true,
          message: '',
          data: { email: user.email, userName: user.userName }
        }
      }
    }
    return {
      statusCode: 404,
      body: {
        status: false,
        message: 'User not found',
        data: null
      }
    }
  }

  async editUser(id: number, user: IUser): Promise<IResult> {
    user.password = await passwordHash(user.password, 10);
    const result = await this.editItem(id, user.email);
    return {
      statusCode: 200,
      body: {
        status: true,
        message: '',
        data: result
      }
    }
  }

  async removeUser(id: number): Promise<IResult> {
    await remove(id);
    const result = await this.removeItem(id);
    if(result.raw.affectedRows) {
      return {
        statusCode: 202,
        body: {
          status: true,
          message: 'User has been removed',
          data: null
        }
      }
    }
    return {
      statusCode: 402,
      body: {
        status: false,
        message: 'User does not exist',
        data: null
      }
    }
  }

  async login(user: IUser): Promise<IResult> {
    const result = await this.repo.findOne({ email: user.email });
    if(result) {
      if(await passwordCompare(user.password, result.password)) {
        return {
          statusCode: 200,
          body: {
            status: true,
            message: '',
            data: await createToken(result.id)
          }
        }
      }
      return {
        statusCode: 401,
        body: {
          status: false,
          message: 'Email or password is incorrect',
          data: null
        }
      }
    }
    return {
      statusCode: 401,
      body: {
        status: false,
        message: 'Email or password is incorrect',
        data: null
      }
    }
  }
}