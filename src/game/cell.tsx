import cx from 'classnames';
import { useMemo } from 'react';
import { cellColorClassName, cellMarginClass } from './styles';
import type { GameCell as CellType } from './types';

export const GameCell = ({ cell, cellSide }: {cell: CellType, cellSide: number}) => {
  const squareStyles = useMemo(() => ({
    width: `${cellSide}px`,
    height: `${cellSide}px`,
  }), [cellSide]);
  return (
    <div style={squareStyles} className={cx('rounded', cellMarginClass, cellColorClassName(cell))} />
  );
};
