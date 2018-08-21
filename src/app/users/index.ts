// import DB
import { Datebase } from './../db/db';

// import controller
import { UsersController } from './users.controller';

// import providers
import { UsersService } from './users.service';

const db = new Datebase();
const usersService = new UsersService(db);

export const usersController = new UsersController(usersService);