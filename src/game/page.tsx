import { useParams } from 'react-router-dom';

import { usePlayerIdForGameId } from '../player/usePlayerIdForGameId';
import { GameId } from './types';
import { Game } from './component';
import { makeClaimPlayerButton } from '../player/claim/button';

const RedPlayerButton = makeClaimPlayerButton('RED');
const BluePlayerButton = makeClaimPlayerButton('BLUE');

export function GamePage() {
  const { token: gameToken_ } = useParams();
  const gameToken = gameToken_ as GameId;
  const { data: playerToken } = usePlayerIdForGameId(gameToken);
  return (
    <div className="pt-10 w-full flex">
      <div className="w-full">
        <div className="space-x-4">
          <RedPlayerButton gameToken={gameToken} playerToken={playerToken} />
          <BluePlayerButton gameToken={gameToken} playerToken={playerToken} />
        </div>
        <Game gameToken={gameToken} playerToken={playerToken} />
      </div>
    </div>
  );
}
