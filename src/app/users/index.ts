// import DB
import { Datebase } from './../db/db';

// import controller
import { UsersController } from './users.controller';

// import providers
import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';

const db = new Datebase();
const usersService = new UsersService(db);
const userEntity = new UserEntity();

export const usersController = new UsersController(usersService, userEntity);