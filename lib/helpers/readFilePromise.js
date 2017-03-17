// @flow

import { readFile } from 'fs';

export const createReadFilePromise = (readFileFn: Function) =>
  (path : string) : Promise<Buffer> => new Promise(
    (resolve, reject) => {
      readFileFn(path, (error, data) => {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });

const readFilePromise = createReadFilePromise(readFile);

export default readFilePromise;
