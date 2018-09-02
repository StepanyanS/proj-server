export interface IColor {
  readonly name: string;
  readonly value: string;
}

export interface IProjectData {
  colors: IColor[];
  colorsSources: string;
}

export interface IProject {
  id: number;
  userId: number;
  projectName: string;
  date: string;
  data: IProjectData;
}