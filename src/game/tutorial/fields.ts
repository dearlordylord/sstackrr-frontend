// WARNING! You're on the territory of MUTABILITY!

import type { GameField, X, Y } from '../types';
import { PlayerColor } from '../../player/types';
import { zip } from '../../utils/zip';

const initTemplate = () => Array.from({ length: 7 }, () => Array.from({ length: 7 }, () => null));

let mutableTemplate: GameField = initTemplate();

let mutableFields: GameField[] = [];
let mutablePlayerSequence: PlayerColor[] = [];

const snapshot = (): void => {
  mutableFields.push(mutableTemplate.map((row) => row.slice()).slice());
};

let currentPlayer: PlayerColor = 'RED';
const playerMap: { [key in PlayerColor]: PlayerColor } = {
  RED: 'BLUE',
  BLUE: 'RED',
};

const addTurnOf = (x: X, y: Y, p: PlayerColor) => {
  mutableTemplate[x][y] = p;
  mutablePlayerSequence.push(p);
  snapshot();
};

const addTurn = (x: X, y: Y) => {
  addTurnOf(x, y, currentPlayer);
  currentPlayer = playerMap[currentPlayer];
};

addTurn(3, 0);
addTurn(3, 6);
addTurn(3, 1);
addTurn(4, 6);
addTurn(3, 2);
addTurn(3, 3);
addTurn(4, 0);
addTurn(2, 6);
addTurn(1, 6);
addTurn(5, 6);

export const tutorialGame = zip(mutableFields.slice(), mutablePlayerSequence);

const fullCleanup = () => {
  mutableFields = [];
  mutablePlayerSequence = [];
  mutableTemplate = initTemplate();
};
fullCleanup();

let mutableWinningCombinations: GameField[] = [];

const flushWinningCombination = () => {
  mutableWinningCombinations.push(mutableFields[mutableFields.length - 1]);
  fullCleanup();
};

addTurnOf(0, 0, 'RED');
addTurnOf(0, 1, 'RED');
addTurnOf(0, 2, 'RED');
addTurnOf(0, 3, 'RED');

flushWinningCombination();

addTurnOf(0, 0, 'RED');
addTurnOf(1, 0, 'RED');
addTurnOf(2, 0, 'RED');
addTurnOf(3, 0, 'RED');

flushWinningCombination();

addTurnOf(0, 0, 'RED');
addTurnOf(1, 1, 'RED');
addTurnOf(2, 2, 'RED');
addTurnOf(3, 3, 'RED');

flushWinningCombination();

addTurnOf(0, 3, 'RED');
addTurnOf(1, 2, 'RED');
addTurnOf(2, 1, 'RED');
addTurnOf(3, 0, 'RED');

flushWinningCombination();

export const tutorialWinningCombinations = mutableWinningCombinations.slice();
mutableWinningCombinations = [];
