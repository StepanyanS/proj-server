export interface IResult {
  statusCode: number;
  headers?: Object | null;
  body: {
    status: boolean;
    message: string;
    data: any;
  };
}