import { playerColorClassNames } from '../player/colors';
import type { GameCell } from './types';

export const cellMarginClass = 'm-1';
export const cellColorClassName = (p: GameCell) => (p ? playerColorClassNames[p] : 'bg-gray-100');
