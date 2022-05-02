import { PlayerColor } from '../player/types';

export const cellSideArgControl = {
  control: {
    type: 'range',
    min: 1,
    max: 100,
    step: 1,
  },
};

export const playerColorControl = {
  control: {
    type: 'select',
    options: ['RED', 'BLUE'] as PlayerColor[],
  },
};
