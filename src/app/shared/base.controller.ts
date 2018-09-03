import { Response } from 'express';
import { IResult } from './../models/result.d';

export abstract class BaseController<Service> {

  constructor(public service: Service) {}
  
  protected async handle (handler: Promise<IResult>, res: Response): Promise<void> {
    const result: IResult = await handler;
    res.status(result.statusCode).send(result.body);
  }
}