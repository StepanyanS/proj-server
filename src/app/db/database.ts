import { Connection, createConnection } from 'typeorm';

export class Database {

  public static connection: Connection;

  public static async connect(): Promise<void> {
    Database.connection = await createConnection();
    console.log('Connected to DB');
  }

  public static async close(): Promise<void> {
    try {
      await Database.connection.close();
      console.log('DB connection is closed');
    }
    catch (error) {
      console.log(error);
    }
  }
}