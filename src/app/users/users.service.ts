import {getManager} from "typeorm";

// import models
import { IUser } from "../models/user";
import { IRest } from "../models/rest";

// import entitie
import { UserEntity } from "../entities/user.entity";

export class UsersService implements IRest {

  usersArray: IUser[];

  constructor() {
    this.usersArray = [
      {
        email: 'sasun-07@mail.ru',
        password: '123456',
        name: 'Sasun',
        id: 1
      }
    ];
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    // return this.usersArray.find(user => user.email === email);
    return getManager().getRepository(UserEntity).findOne({email: email});
  }

  getUsers(): Promise<UserEntity[]> {
    return getManager().getRepository(UserEntity).find();
  }

  async addUser(user: UserEntity): Promise<UserEntity> {
    return getManager().getRepository(UserEntity).save(user);
  }

  async editUser(user: IUser): Promise<UserEntity> {
    // const oldUser = {};
    // this.getUserByEmail(user.email)
    // .then((oldUser: IUser) => {
    //   Object.assign(oldUser, user);
    // }).catch(error => console.log(error));
  }
}