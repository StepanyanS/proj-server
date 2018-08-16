import { IUser } from "../models/user";
import { IRest } from "../models/rest";

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

  getUserByEmail(email: string): IUser {
    return this.usersArray.find(user => user.email === email);
  }

  getUsers(): IUser[] {
    return this.usersArray;
  }

  addUser(user: IUser): void {
    user.id = this.usersArray[this.usersArray.length - 1].id + 1;
    this.usersArray.push(user);
  }

  editUser(user: IUser): void {
    Object.assign(this.getUserByEmail(user.email), user);
    console.log(this.getUserByEmail(user.email));
  }
}