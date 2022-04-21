import { useParams } from 'react-router-dom';
import cx from 'classnames';

import { usePlayerIdForGameId } from '../player/usePlayerIdForGameId';
import { GameId } from './types';
import { Game } from './component';
import { makeClaimPlayerButton } from '../player/claim/button';
import { useGame } from './api/get';

const RedPlayerButton = makeClaimPlayerButton('RED');
const BluePlayerButton = makeClaimPlayerButton('BLUE');

export function GamePage() {
  const { token: gameToken_ } = useParams();
  const gameToken = gameToken_ as GameId;
  const playerToken = usePlayerIdForGameId(gameToken);
  const { data: gameData } = useGame(gameToken);
  const game = gameData?.game;
  return (
    <div className="pt-10 w-full flex">
      <div className="w-full">
        <div className={cx('space-x-4', {
          hidden: !!playerToken,
        })}
        >
          {!game?.redClaimed ? <RedPlayerButton gameToken={gameToken} playerToken={playerToken} /> : null }
          {!game?.blueClaimed ? <BluePlayerButton gameToken={gameToken} playerToken={playerToken} /> : null }
        </div>
        <Game gameToken={gameToken} playerToken={playerToken} />
      </div>
    </div>
  );
}
