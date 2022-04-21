import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { INIT_GAME } from '../../../queries';
import { GameStateResponse } from '../types';
import { BotId } from '../../../adversary/types';

export const useInitGame = () => {
  const [mutate_, { reset, ...rest }] = useMutation<{
    initGame: GameStateResponse
  }>(INIT_GAME);
  const mutate = useCallback(async (withBot?: boolean) => {
    const r = await mutate_({
      variables: {
        botId: withBot ? ("RANDY" as BotId) : null
      }
    });
    reset();
    return r;
  }, [mutate_, reset]);
  return {
    ...rest,
    mutate,
  };
};
