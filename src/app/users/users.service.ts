import { EntitySchema, AdvancedConsoleLogger } from 'typeorm';
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
    return result ? this.getResult(200, null, true, 'This email already exists', true) : this.getResult(200, null, true, '', false);
  }

  async addUser(user: IUser): Promise<IResult> {
    const exists = await this.findByEmail(user.email);
    if(exists.body.data) return this.getResult(422, null, false, 'This email already exists');
    user.password = await passwordHash(user.password, 10);
    const result = await this.addItem(user);
    return result ? this.getResult(201, null, true, 'Now You can login') : this.getResult(502, null, false, 'Something went wrong');
  }

  async getUser(id: number) {
    const user = await this.getById(id);
    return user ? this.getResult(200, null, true, '', { email: user.email, userName: user.userName }) : this.getResult(404, null, false, 'User not found');
  }

  async editUser(id: number, user: IUser): Promise<IResult> {
    const userForEdit = await this.repo.findOne({ email: user.email });
    if(userForEdit) {
      if(await passwordCompare(user.password, userForEdit.password)) {
        user.password = await passwordHash(user.newPassword, 10);
        await this.editItem(id, user);
        return this.getResult(200, null, true, '', { email: user.email, userName: user.userName });
      }
      return this.getResult(401, null, false, 'Password is incorrect');
    }
  }

  async removeUser(id: number): Promise<IResult> {
    await remove(id);
    const result = await this.removeItem(id);
    return result.raw.affectedRows ? this.getResult(202, null, true, 'User has been removed') : this.getResult(402, null, false, 'User does not exist');
  }

  async login(user: IUser): Promise<IResult> {
    const result = await this.repo.findOne({ email: user.email });
    if(result) {
      if(await passwordCompare(user.password, result.password)) {
        return this.getResult(200, null, true, '', await createToken(result.id));
      }
      return this.getResult(401, null, false, 'Email or password is incorrect');
    }
    return this.getResult(401, null, false, 'Email or password is incorrect');
  }
}