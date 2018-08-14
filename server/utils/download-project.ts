import { resolve } from "path";

const downloadFolder = resolve(__dirname,  '../deliver/');

export function downloadProject(req, res): void {
  const file = `${downloadFolder}/${req.query.projectName}.zip`;
  res.download(file);
  console.log('Downloaded');
}