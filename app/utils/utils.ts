import { resolve } from "path";
import { newProjectDir } from "../data/data";

/**
 * @description Gets new project directory by its name
 * @param {string} name
 * @returns {string}
 */
export function getNewProjectDir(name: string): string {
  return resolve(__dirname, newProjectDir, name);
}