import { Connection } from 'typeorm';

export interface IDB {
  connect(): Promise<Connection | false>;
  close(): Promise<void>;
}