import { useCallback, useMemo } from 'react';

import { GameId } from '../game/types';
import { useLocalStorageContext } from '../localStorage/context';
import { PlayerId } from './types';

export const usePlayerIdForGameId = (gameToken?: GameId) => {
  const context = useLocalStorageContext();
  const playerToken = useMemo(
    () => (gameToken ? context.playerTokenForGameToken.get(gameToken) : undefined),
    [gameToken, context.playerTokenForGameToken],
  );
  const set = useCallback((pt: PlayerId) => {
    if (!gameToken) return;
    context.setPlayerTokenForGameToken(gameToken, pt);
  }, [context.playerTokenForGameToken, context.setPlayerTokenForGameToken]);
  return { data: playerToken, set };
};
