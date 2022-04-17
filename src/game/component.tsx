import { GameId } from './types';
import { PlayerId } from '../player/types';

interface Props {
  gameToken: GameId;
  playerToken?: PlayerId;
}

export function Game({ gameToken, playerToken }: Props) {
  return (
    <div>
      <h1>Game</h1>
      <p>
        Game token:
        {gameToken}
      </p>
      <p>
        Player token:
        {playerToken}
      </p>
    </div>
  );
}
