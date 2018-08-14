import { createWriteStream, WriteStream } from "fs";

export async function writeStyles(variablesFile: string, data: string): Promise<void> {
  try {
    const wrStream: WriteStream = createWriteStream(variablesFile);
    await wrStream.write(data);
    console.log('Variables written!');
  } catch (err) {
      console.error(err);
  }
}