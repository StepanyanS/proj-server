// import controller
import { UsersController } from './users.controller';

// import provider
import { UsersService } from './users.service';

const usersService = new UsersService();

export const usersController = new UsersController(usersService);