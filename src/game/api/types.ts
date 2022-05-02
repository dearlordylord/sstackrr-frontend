/**
 * type GameStateResult {
  id: String!
  state: [[Player]!]!
  nextPlayer: Player
  winner: Player
  isStalemate: Boolean!
}
 */
import type { GameField, GameId } from '../types';
import type { PlayerColor } from '../../player/types';

export interface GameStateResponse {
  id: GameId;
  state: GameField;
  nextPlayer?: PlayerColor;
  winner?: PlayerColor;
  isStalemate: boolean;
  redClaimed: boolean;
  blueClaimed: boolean;
}
