// import modules
import { Router, Request, Response } from 'express';
import { users } from '../users/index';

// import models
import { IUser } from '../models/user';

const usersArray: IUser[] = [
  {
    email: 'sasun-07@mail.ru',
    password: '123456',
    name: 'Sasun',
    id: 1
  }
];

export class UsersRouter {

  router: Router;

  constructor () {
    this.router = Router();
    this.route();
  }

  route(): void {
    this.router.get('/', (req: Request, res: Response) => {
      const requestedEmail = req.query['email'];
      res.send(
        users.getUser(requestedEmail, usersArray)
      );
      console.log(users.getUser(requestedEmail, usersArray));
    });

    this.router.put('/', (req: Request, res: Response) => {
      users.editUser(req.body, usersArray);
      console.log(users.getUsers(usersArray));
      res.status(201).send(req.body);
    });
    
    this.router.route('/').post((req: Request, res: Response) => {
      users.addUser(req.body, usersArray);
      console.log(users.getUsers(usersArray));
      res.status(201).send(req.body);
    });
  }
}