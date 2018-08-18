import { Connection } from 'typeorm';

export interface IDB {
  connect(): Promise<Connection>;
  close(): Promise<Connection>;
}