import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';

export class App {};

import { copyProject } from "./utils/copy-project";

import { makeZip } from './utils/make-zip';

import { writeStyles } from './write-styles';

import { downloadProject } from './utils/download-project';

import { IUser } from './models/user';

import { Rest } from './rest';

import { WriteData } from './write-data/write-data';

import { IProject } from './models/project.d';

const users: IUser[] = [
  {
    email: 'sasun-07@mail.ru',
    password: '123456',
    name: 'Sasun',
    id: 1
  }
];

function getVariablesFilePath(projectName: string): string {
  return path.resolve(__dirname, `./deliver/${projectName}/src/assets/scss/utilities/_variables.scss`);
}

const app = express();
const rest = new Rest(users);

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Server started!');
});

app.route('/api/users/').get((req, res): void => {
  const requestedEmail = req.query['email'];
  res.send(
    rest.getUser(requestedEmail)
  );
  console.log(rest.getUser(requestedEmail));
});

app.route('/api/users/').put((req, res): void => {
  rest.editUser(req.body);
  console.log(rest.getUsers());
  res.status(201).send(req.body);
});

app.route('/api/users/').post((req, res): void => {
  rest.addUser(req.body);
  console.log(rest.getUsers());
  res.status(201).send(req.body);
});

app.route('/api/create-project/').post((req, res): void => {
  createProject(req.body).then((isCreated) => {
    res.status(201).send(isCreated);
  });
});

app.route('/api/download-project/').get(downloadProject);

const colorsSources = {
  primary: 'red',
  secondary: 'black'
};

const writeData = new WriteData();

async function createProject(project: IProject): Promise<boolean> {
  try {
    await copyProject(project.name);
    await writeStyles(getVariablesFilePath(project.name), writeData.getWriteData(project.colors, colorsSources));
    return makeZip(project.name).then(res => res);
  } catch(error) {
    console.log(error);
  }
}