import { EntitySchema } from 'typeorm';
import { IUser } from '../models/user.d';

export const UserEntity = new EntitySchema<IUser>({
  name: 'users',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    email: {
      type: String,
      length: 255
    },
    password: {
      type: String,
      length: 255
    },
    userName: {
      type: String,
      length: 255
    }
  }
});