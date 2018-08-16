// import controller
import { UsersController } from './users.controller';

// import provider
import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';

const usersService = new UsersService();
const userEntity = new UserEntity();

export const usersController = new UsersController(usersService, userEntity);