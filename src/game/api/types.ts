/**
 * type GameStateResult {
  id: String!
  state: [[Player]!]!
  nextPlayer: Player
  winner: Player
  isStalemate: Boolean!
}
 */
import { GameId } from '../types';
import { PlayerColor } from '../../player/types';

export interface GameStateResponse {
  id: GameId;
  state: (PlayerColor | null)[][];
  nextPlayer?: PlayerColor;
  winner?: PlayerColor;
  isStalemate: boolean;
}
