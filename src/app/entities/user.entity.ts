// import modules
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @description Entity instance for User
 * @export
 * @class UserEntity
 */
@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;
}