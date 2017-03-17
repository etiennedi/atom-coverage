export const createGetCurrentPath = atom =>
  () => atom.workspace.getActivePaneItem().buffer.file.path;

const getCurrentPath = createGetCurrentPath(atom);

export default getCurrentPath;
