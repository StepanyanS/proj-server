export abstract class BaseService<T> {

  // constructor(protected db: Database) {
  // }

  // protected async getById(id: number) {
  //   // return this.db.connect().then(async (connection: Connection): Promise<IError | T> => {
  //   //   if(connection) {
  //   //     console.log('connection');
  //   //     const result = await connection.getRepository(T).findOne({id: id}) ;
  //   //     console.log('await');
  //   //     await connection.close();
  //   //     return result;
  //   //     // if(!result) {
  //   //     //   const error: IError = {
  //   //     //     type: 'Access denied.',
  //   //     //     statusCode: 422,
  //   //     //     message: 'Cannot get user data'
  //   //     //   }
  //   //     //   await connection.close();
  //   //     //   console.log('DB connection is closed');
  //   //     //   return error;
  //   //     // }

  //   //     // const userData: UserFromServer = new UserFromServer(result.email, result.name);

  //   //     // await connection.close();
  //   //     // console.log('DB connection is closed');
  //   //     // return userData;
  //   //   }

  //   //   const error: IError = {
  //   //     type: 'Bad Gateway',
  //   //     statusCode: 502,
  //   //     message: 'Cannot connect database'
  //   //   }
  //   //   return error;
  //   // }).catch(err => {
  //   //   const error: IError = {
  //   //     type: 'Bad Gateway',
  //   //     statusCode: 502,
  //   //     message: 'Something went wrong'
  //   //   }
  //   //   return error;
  //   // });
  // }
}