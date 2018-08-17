import { Connection, createConnection } from "typeorm";

export class Datebase {

  connection: Connection;

  constructor() {}

  async connect() {
    this.connection = await createConnection();
    console.log('Connected to DB');
    return this.connection;
  }

  async close() {
    await this.connection.close();
    console.log('DB connection is closed');
  }
}