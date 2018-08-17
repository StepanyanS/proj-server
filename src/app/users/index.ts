// import DB
import { Datebase } from './../db/db';

// import controller
import { UsersController } from './users.controller';

// import providers
import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';

const db = new Datebase();
const userEntity = new UserEntity();
const usersService = new UsersService(db, userEntity);

export const usersController = new UsersController(usersService);