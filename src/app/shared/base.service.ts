import { Database } from "../db/database";
import { Repository, EntitySchema } from "typeorm";

export abstract class BaseService<T> {
  repo: Repository<T>;
  entity: EntitySchema<T>;

  constructor(entity: EntitySchema<T>) {
    this.entity = entity;
    this.repo = Database.connection.getRepository(this.entity);
  }

  protected async addItem(item) {
    await this.repo.save(item);
  }

  protected async getById(id: number) {
    return await this.repo.findOne(id);
  }
}