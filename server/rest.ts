// import models
import { IUser } from './models/user.d';
import { IRest } from './models/rest';

export class Rest implements IRest {

    constructor(private users: IUser[]) {}

    getUser(email: string): IUser {
        return <IUser>this.users.find(user => user.email === email);
    }

    getUsers(): IUser[] {
      return <IUser[]>this.users;
    }

    addUser(user: IUser): void {
      const id: number = this.users[this.users.length - 1].id + 1;
      user.id = id;
      this.users.push(user);
    }

    editUser(user: IUser): void {
      Object.assign(this.getUser(user.email), user);
      console.log(this.getUser(user.email));
    }
}
