import { createReadFilePromise } from './readFilePromise';

// stubing readFile for dependency injection
const readFileFail = (path, callback) => {
  callback('error');
};
const readFileSuccess = (path, callback) => {
  callback(null, 'data');
};


describe('readFilePromise success', () => {
  const readFilePromise = createReadFilePromise(readFileFail);
  it('rejects with an error', () => readFilePromise('path').catch(
      (e) => {
        expect(e).toEqual('error');
      },
    ));
});

describe('readFilePromise success', () => {
  const readFilePromise = createReadFilePromise(readFileSuccess);
  it('resolves with the data', () => readFilePromise('path').then(
      (data) => {
        expect(data).toEqual('data');
      },
    ));
});
