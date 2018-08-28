// import modules
import { sign } from "jsonwebtoken";

// import models
import { JwtPayload } from "../models/jwt";

/**
 * @description Generates token by given id and secret key
 * @export
 * @param {number} id
 * @returns {string}
 */
export function createToken(id: number): string {
  const expiresIn = 3600;
  const user: JwtPayload = { id: id };
  return sign(user, 'secretKey', { expiresIn: expiresIn});
}