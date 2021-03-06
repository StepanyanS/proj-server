import { Database } from '../db/database';
import { Repository, EntitySchema, DeepPartial, UpdateResult, DeleteResult, FindConditions } from 'typeorm';
import { IResult } from '../models/result';

export abstract class BaseService<T> {
  protected repo: Repository<T>;

  constructor(protected entity: EntitySchema<T>) {
    this.repo = Database.connection.getRepository(this.entity);
  }

  protected async addItem(item: DeepPartial<T>): Promise<DeepPartial<T>> {
    return await this.repo.save(item);
  }

  protected async getById(id: number): Promise<T> {
    return await this.repo.findOne(id);
  }

  protected async editItem(id: number, item): Promise<UpdateResult> {
    return await this.repo.update(id, item);
  }

  protected async removeItem(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }

  protected async getAll(options: FindConditions<T>): Promise<T[]> {
    return await this.repo.find(options);
  }

  protected getResult(statusCode: number, headers: Object | null, status: boolean, message: string, data: any = null): IResult {
    return {
      statusCode: statusCode,
      headers: headers,
      body: {
        status: status,
        message: message,
        data: data
      }
    }
  }
}