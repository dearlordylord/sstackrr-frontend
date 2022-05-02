import type { PlayerColor } from '../player/types';

enum GameIdBrand {
  _ = '',
}

export type GameId = string & GameIdBrand;

export type GameSide = 'LEFT' | 'RIGHT';

export type GameCell = PlayerColor | null;

export type GameField = GameCell[][];

enum XBrand {
  _ = 0,
}
export type X = number & XBrand;
enum YBrand {
  _ = 0,
}
export type Y = number & YBrand;
