import { Connection, createConnection } from "typeorm";

/**
 * @description Database instance
 * @export
 * @class Datebase
 */
export class Datebase {

  connection: Connection;

  /**
   * @description Creates an instance of Datebase.
   * @memberof Datebase
   */
  constructor() {}

  /**
   * @description Creates connection to database
   * @returns {Promise<Connection>}
   * @memberof Datebase
   */
  async connect(): Promise<Connection> {
    this.connection = await createConnection();
    console.log('Connected to DB');
    return this.connection;
  }

  
  /**
   * @description Closes connection to database
   * @returns {Promise<Connection>}
   * @memberof Datebase
   */
  async close(): Promise<Connection> {
    await this.connection.close();
    console.log('DB connection is closed');
    return this.connection;
  }
}