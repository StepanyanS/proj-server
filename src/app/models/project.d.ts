export interface IColor {
  readonly name: string;
  readonly value: string;
}

export interface IProjectData {
  colors: IColor[];
  colorsSources: Object;
}

export interface IProject {
  readonly id?: number;
  user: number;
  projectName: string;
  date: Date;
  data: IProjectData;
}