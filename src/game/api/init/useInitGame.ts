import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { INIT_GAME } from '../../../queries';
import { GameStateResponse } from '../types';

export const useInitGame = () => {
  const [mutate_, { reset, ...rest }] = useMutation<{
    initGame: GameStateResponse
  }>(INIT_GAME);
  const mutate = useCallback(async () => {
    const r = await mutate_();
    reset();
    return r;
  }, [mutate_, reset]);
  return {
    ...rest,
    mutate,
  };
};
