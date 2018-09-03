export interface IResult {
  statusCode: number;
  body: {
    status: boolean;
    message: string;
    data: any;
  };
}