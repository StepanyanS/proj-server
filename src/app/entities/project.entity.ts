import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * @description Entity instance for Project
 * @export
 * @class ProjectEntity
 */
@Entity()
export class ProjectEntity {

  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id: number;

  @Column({
    type: 'int'
  })
  userId: number;

  @Column({
    type: 'varchar',
    length: 255
  })
  name: string;

  @Column({
    type: 'varchar'
  })
  date: string;

  @Column({
    type: 'varchar'
  })
  data: string;
}