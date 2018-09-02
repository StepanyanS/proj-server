import { EntitySchema } from 'typeorm';
import { IProject } from '../models/project';

export const ProjectEntity = new EntitySchema<IProject>({
  name: 'projects',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true
    },
    userId: {
      type: Number
    },
    projectName: {
      type: String,
      length: 255
    },
    date: {
      type: Date
    },
    data: {
      type: 'json'
    }
  }
});