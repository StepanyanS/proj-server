// import modules
import { Connection, createConnection } from 'typeorm';

// import models
import { IDB } from '../models/db';

/**
 * @description Database instance
 * @export
 * @class Database
 */
export class Database implements IDB {

  connection: Connection;
  
  /**
   * @description Creates a connection to database
   * @returns {(Promise<Connection | false>)}
   * @memberof Database
   */
  async connect(): Promise<Connection | false> {
    try {
      this.connection = await createConnection();
      console.log('Connected to DB');
      return this.connection;
    }
    catch(error) {
      return false;
    }
  }

  
  /**
   * @description Closes connection to database
   * @returns {Promise<void>}
   * @memberof Database
   */
  async close(): Promise<void> {
    try {
      await this.connection.close();
      console.log('DB connection is closed');
    }
    catch(error) {
      console.log(error);
    }
  }
}