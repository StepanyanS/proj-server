import { Response } from 'express';
import { IResult } from './../models/result.d';

export abstract class BaseController<T> {

  constructor(protected service: T) {}
  
  protected async handle (handler: Promise<IResult>, res: Response): Promise<void> {
    try {
      const result: IResult = await handler;
      res.status(result.statusCode).send(result.body);
    }
    catch(err) {
      res.status(502).send({
        status: false,
        message: 'Something went wrong',
        data: null
      })
    }
  }
}