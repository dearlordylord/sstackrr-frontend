import type { GameStateResponse } from '../../game/api/types';
import type { PlayerId } from '../types';

export interface ClaimPlayerResponse {
  game: GameStateResponse;
  playerToken: PlayerId;
}
