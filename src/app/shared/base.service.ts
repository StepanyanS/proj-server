import { Database } from '../db/database';
import { Repository, EntitySchema, DeepPartial } from 'typeorm';

export abstract class BaseService<T> {
  repo: Repository<T>;
  entity: EntitySchema<T>;

  constructor(entity: EntitySchema<T>) {
    this.entity = entity;
    this.repo = Database.connection.getRepository(this.entity);
  }

  protected async addItem(item: DeepPartial<T>): Promise<void> {
    await this.repo.save(item);
  }

  protected async getById(id: number): Promise<T> {
    return await this.repo.findOne(id);
  }

  protected async editItem(id: number, item: DeepPartial<T>) {
    return await this.repo.update(id, item);
  }

  protected async removeItem(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}