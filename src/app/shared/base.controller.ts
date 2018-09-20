import { Response } from 'express';
import { IResult } from './../models/result.d';

export abstract class BaseController<T> {

  constructor(protected service: T) {}
  
  protected async handle(handler: Promise<IResult>, res: Response, resType: string = 'send'): Promise<void> {
    try {
      const result: IResult = await handler;
      if(result.headers) {
        res.set(result.headers);
      }
      switch(resType) {
        case 'json':
          res.status(result.statusCode).json(result.body);
          break;
        case 'download':
          res.status(result.statusCode).download(result.body.data);
          break;
        default:
          res.status(result.statusCode).send(result.body);
      }
    }
    catch(err) {
      console.log(err);
      res.status(502).send({
        status: false,
        message: 'Something went wrong',
        data: null
      })
    }
  }
}