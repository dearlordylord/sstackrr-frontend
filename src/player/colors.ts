// https://stackoverflow.com/a/66593793/2123547 - use full class names
import { PlayerColor } from './types';

export const playerColorClassNames: {[k in PlayerColor]: string} = {
  RED: 'bg-red-500',
  BLUE: 'bg-blue-500',
};

export const playerColorHoverClassNames: {[k in PlayerColor]: string} = {
  RED: 'bg-red-700',
  BLUE: 'bg-blue-700',
};
