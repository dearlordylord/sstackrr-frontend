import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { TURN } from '../../../queries';
import { GameStateResponse } from '../types';
import { PlayerId } from '../../../player/types';
import { GameSide } from '../../types';

interface TurnInput {
  side: GameSide;
  height: number;
}

interface ApiArgs {
  playerToken: PlayerId;
  turn: TurnInput;
}

export const useMakeTurn = () => {
  const [mutate_, { reset, ...rest }] = useMutation<{
    turn: GameStateResponse
  }, ApiArgs>(TURN);
  const mutate = useCallback(async (args: ApiArgs) => {
    const r = await mutate_({
      variables: args,
    });
    reset();
    return r;
  }, [mutate_, reset]);
  return {
    ...rest,
    mutate,
  };
};
