import { createGetCurrentPath } from './currentPath';

const atomStub = {
  workspace: {
    getActivePaneItem: () => ({
      buffer: {
        file: {
          path: 'samplePath',
        },
      },
    }),
  },
};

describe('getCurrentPath', () => {
  const getCurrentPath = createGetCurrentPath(atomStub);

  it('returns the current active panes path', () => {
    expect(getCurrentPath()).toEqual('samplePath');
  });
});
