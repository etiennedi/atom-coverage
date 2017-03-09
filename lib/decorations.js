'use babel';

// @flow

import { Point, Range } from 'atom';

type Boundary = {
  line: number,
  column: number,
};

type Statement = {
    start: Boundary,
    end: Boundary,
    covered: number,
}

const createPointFromBoundary = (boundary : Boundary) =>
  new Point(boundary.line - 1, boundary.column);

const createRangeFromStatement = (statement : Statement) =>
  new Range(
    createPointFromBoundary(statement.start),
    createPointFromBoundary(statement.end),
  );

function getDecorationCssClass(statement: Statement) {
  return statement.covered ? 'covered' : 'uncovered';
}

const addDecoratorFromMap = (editor :any) => (statement : Statement) => {
  const range = createRangeFromStatement(statement);
  const marker = editor.markBufferRange(range, { invalidate: 'never' });

  const css = getDecorationCssClass(statement);
  return editor.decorateMarker(marker, { type: 'highlight', class: css });
};

export { addDecoratorFromMap };
