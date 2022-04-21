import { useCallback, useMemo } from 'react';

import { GameId } from '../game/types';
import { useLocalStorageContext } from '../localStorage/context';
import { PlayerId } from './types';

export const usePlayerIdForGameId = (gameToken?: GameId) => {
  const context = useLocalStorageContext();
  const playerToken = useMemo(
    () => (gameToken ? context.playerTokenForGameToken.get(gameToken) : undefined),
    [gameToken, context],
  );
  return playerToken;
};

export const useSetPlayerIdForGameId = () => {
  const context = useLocalStorageContext();
  return useCallback((gameToken: GameId, pt: PlayerId) => {
    if (!gameToken) throw new Error('gameToken is required');
    context.setPlayerTokenForGameToken(gameToken, pt);
  }, [context]);
};
